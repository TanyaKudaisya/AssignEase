// Beautiful Calendar for AssignEase
class AssignmentCalendar {
    constructor(containerId, assignments = []) {
        this.container = document.getElementById(containerId);
        this.assignments = assignments;
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        this.dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.render();
    }

    render() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="calendar-container">
                <div class="calendar-header">
                    <h4>📅 Assignment Calendar</h4>
                    <div class="calendar-nav">
                        <button onclick="calendar.previousMonth()">← Previous</button>
                        <span id="current-month-year">${this.monthNames[this.currentMonth]} ${this.currentYear}</span>
                        <button onclick="calendar.nextMonth()">Next →</button>
                    </div>
                </div>
                <div class="calendar-grid">
                    ${this.renderDayHeaders()}
                    ${this.renderDays()}
                </div>
                <div class="assignment-list" id="assignment-list">
                    ${this.renderUpcomingAssignments()}
                </div>
            </div>
        `;
    }

    renderDayHeaders() {
        return this.dayNames.map(day => 
            `<div class="calendar-day-header">${day}</div>`
        ).join('');
    }

    renderDays() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const today = new Date();
        
        let days = '';
        
        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days += '<div style="background: transparent;"></div>';
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasAssignment = this.hasAssignmentOnDate(dateStr);
            const assignmentCount = this.getAssignmentsForDate(dateStr).length;
            const isToday = day === today.getDate() && 
                          this.currentMonth === today.getMonth() && 
                          this.currentYear === today.getFullYear();
            
            const classes = ['calendar-day'];
            if (isToday) classes.push('today');
            if (hasAssignment) classes.push('has-assignment');
            
            const badge = hasAssignment && assignmentCount > 0 ? 
                `<div style="position: absolute; top: 8px; right: 8px; background: var(--primary-teal); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; box-shadow: 0 2px 8px rgba(46, 189, 180, 0.4);">${assignmentCount}</div>` : '';
            
            days += `<div class="${classes.join(' ')}" onclick="calendar.showAssignmentsForDay('${dateStr}')" title="${hasAssignment ? assignmentCount + ' assignment(s) due' : 'No assignments'}">${day}${badge}</div>`;
        }
        
        return days;
    }

    hasAssignmentOnDate(dateStr) {
        return this.assignments.some(assignment => {
            const dueDate = new Date(assignment.deadline);
            const checkDate = new Date(dateStr);
            return dueDate.toDateString() === checkDate.toDateString();
        });
    }

    getAssignmentsForDate(dateStr) {
        const checkDate = new Date(dateStr);
        return this.assignments.filter(assignment => {
            const dueDate = new Date(assignment.deadline);
            return dueDate.toDateString() === checkDate.toDateString();
        });
    }

    renderUpcomingAssignments() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = this.assignments
            .filter(assignment => new Date(assignment.deadline) >= today)
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .slice(0, 5);
        
        if (upcoming.length === 0) {
            return `
                <div style="text-align: center; padding: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                    <h5 style="color: var(--primary-dark); margin-bottom: 0.5rem;">All Caught Up!</h5>
                    <p style="color: #64748b; margin: 0;">No upcoming assignments at the moment</p>
                </div>
            `;
        }
        
        return `
            <h5>🚀 Upcoming Assignments</h5>
            ${upcoming.map(assignment => {
                const dueDate = new Date(assignment.deadline);
                const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                const urgency = daysUntil <= 2 ? '🔥' : daysUntil <= 5 ? '⚠️' : '📝';
                const urgencyColor = daysUntil <= 2 ? '#ef4444' : daysUntil <= 5 ? '#f59e0b' : 'var(--primary-teal)';
                
                return `
                    <div class="assignment-item" style="border-left-color: ${urgencyColor};">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="font-size: 1.5rem;">${urgency}</span>
                            <div class="assignment-date">Due: ${dueDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} (${daysUntil} day${daysUntil !== 1 ? 's' : ''})</div>
                        </div>
                        <div class="assignment-title">${assignment.title}</div>
                        <div class="assignment-course">📚 ${assignment.course}</div>
                    </div>
                `;
            }).join('')}
        `;
    }

    showAssignmentsForDay(dateStr) {
        const assignments = this.getAssignmentsForDate(dateStr);
        const listContainer = document.getElementById('assignment-list');
        const date = new Date(dateStr);
        
        if (assignments.length === 0) {
            listContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📅</div>
                    <h5 style="color: var(--primary-dark); margin-bottom: 0.5rem;">${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h5>
                    <p style="color: #64748b; margin: 0;">No assignments due on this day</p>
                </div>
            `;
        } else {
            listContainer.innerHTML = `
                <h5>📅 Assignments for ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h5>
                ${assignments.map(assignment => `
                    <div class="assignment-item">
                        <div class="assignment-title">${assignment.title}</div>
                        <div class="assignment-course">📚 ${assignment.course}</div>
                    </div>
                `).join('')}
            `;
        }
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.render();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.render();
    }

    updateAssignments(assignments) {
        this.assignments = assignments;
        this.render();
    }
}

// Global calendar instance
let calendar;
