/**
 * People Data Loader
 * Loads member information from current_members folder and renders cards
 */

class PeopleLoader {
    constructor() {
        this.membersData = {
            phd: [],
            master: []
        };
    }

    /**
     * Load members list and then load each member's data
     */
    async loadMembersData() {
        try {
            // First, load the members list
            const listResponse = await fetch('current_members/members-list.json');
            if (!listResponse.ok) {
                throw new Error(`Failed to load members list: ${listResponse.status}`);
            }
            const membersList = await listResponse.json();

            // Load all member files in order (maintain order from members-list.json)
            const memberMap = new Map();
            
            // Load PhD students in order
            if (membersList.phd) {
                for (const filename of membersList.phd) {
                    const member = await this.loadMemberFile('current_members/' + filename, 'phd');
                    if (member) {
                        memberMap.set(filename, member);
                    }
                }
                // Add members in the order from members-list.json
                membersList.phd.forEach(filename => {
                    if (memberMap.has(filename)) {
                        this.membersData.phd.push(memberMap.get(filename));
                    }
                });
            }

            // Load Master students in order
            if (membersList.master) {
                for (const filename of membersList.master) {
                    const member = await this.loadMemberFile('current_members/' + filename, 'master');
                    if (member) {
                        memberMap.set(filename, member);
                    }
                }
                // Add members in the order from members-list.json
                membersList.master.forEach(filename => {
                    if (memberMap.has(filename)) {
                        this.membersData.master.push(memberMap.get(filename));
                    }
                });
            }

        } catch (error) {
            console.error('Failed to load members data:', error);
        }
    }

    /**
     * Load a single member file
     */
    async loadMemberFile(url, category) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`Failed to load ${url}: ${response.status}`);
                return null;
            }
            const member = await response.json();
            if (member && member.category === category) {
                return member;
            }
            return null;
        } catch (error) {
            console.warn(`Error loading ${url}:`, error);
            return null;
        }
    }

    /**
     * Render people cards for a category
     */
    renderCategory(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return;
        }

        const members = this.membersData[category] || [];
        if (members.length === 0) {
            console.warn(`No data for category: ${category}`);
            return;
        }

        // Find or create the section
        let section = container.querySelector('.articles-people');
        if (!section) {
            section = document.createElement('section');
            section.className = 'articles-people';
            container.appendChild(section);
        }

        // Clear existing content
        section.innerHTML = '';

        // Render each member
        members.forEach(member => {
            const card = this.createMemberCard(member);
            section.appendChild(card);
        });
    }

    /**
     * Create a member card element
     */
    createMemberCard(member) {
        const article = document.createElement('article-people');
        
        const wrapper = document.createElement('div');
        wrapper.className = 'article-wrapper-people';
        
        // Figure with image
        const figure = document.createElement('figure-people');
        const img = document.createElement('img');
        img.src = member.image || 'static/img/people/current/placeholder_dalle1.webp';
        img.alt = member.name;
        img.style.width = '215pt';
        img.style.height = '215pt';
        img.style.objectFit = 'cover';
        
        figure.appendChild(img);
        wrapper.appendChild(figure);
        
        // Article body
        const body = document.createElement('div');
        body.className = 'article-body-people';
        
        // Name
        const h4 = document.createElement('h4');
        h4.textContent = member.name;
        body.appendChild(h4);
        
        // Description
        const p = document.createElement('p');
        p.style.marginBottom = '0pt';
        p.style.hyphens = 'auto';
        
        // Add emphasis if exists
        if (member.emphasis) {
            const emphasis = document.createElement('span');
            emphasis.className = 'emphasis';
            emphasis.textContent = member.emphasis;
            p.appendChild(emphasis);
            p.appendChild(document.createElement('br'));
        }
        
        // Add description
        const descriptionText = document.createTextNode(member.description || '');
        p.appendChild(descriptionText);
        body.appendChild(p);
        
        // Homepage link
        if (member.homepage && member.homepage !== '#' && member.homepage !== 'null' && member.homepage !== null) {
            const link = document.createElement('a');
            link.href = member.homepage;
            link.target = '_blank';
            link.textContent = 'Homepage';
            
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('class', 'icon');
            svg.setAttribute('viewBox', '0 0 20 20');
            svg.setAttribute('fill', 'currentColor');
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill-rule', 'evenodd');
            path.setAttribute('d', 'M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z');
            path.setAttribute('clip-rule', 'evenodd');
            svg.appendChild(path);
            link.appendChild(svg);
            
            body.appendChild(link);
        }
        
        wrapper.appendChild(body);
        article.appendChild(wrapper);
        
        return article;
    }

    /**
     * Initialize and render all categories
     */
    async init() {
        await this.loadMembersData();
        
        // Render each category
        this.renderCategory('phd', 'phd-container');
        this.renderCategory('master', 'master-container');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new PeopleLoader();
    loader.init();
});
