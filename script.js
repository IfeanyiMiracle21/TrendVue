// Mock data for social media platforms
const socialData = [
    {
        platform: 'Instagram',
        icon: '📷',  // Emoji: Camera
        followers: 45230,
        growth: '+12.5%',
        trend: 'up',
        engagement: 4.8,
        posts: 156
    },
    {
        platform: 'Twitter',
        icon: '🐦',  // Emoji: Bird (or '✖️' for X rebrand)
        followers: 28940,
        growth: '+8.3%',
        trend: 'up',
        engagement: 3.2,
        posts: 432
    },
    {
        platform: 'Facebook',
        icon: '👍',  // Emoji: Thumbs Up
        followers: 62100,
        growth: '-2.1%',
        trend: 'down',
        engagement: 2.1,
        posts: 89
    },
    {
        platform: 'YouTube',
        icon: '▶️',  // Emoji: Play Button
        followers: 12500,
        growth: '+15.7%',
        trend: 'up',
        engagement: 6.5,
        posts: 34
    },
    {
        platform: 'LinkedIn',
        icon: '💼',  // Emoji: Briefcase
        followers: 8720,
        growth: '+5.4%',
        trend: 'up',
        engagement: 5.2,
        posts: 67
    },
    {
        platform: 'TikTok',
        icon: '🎵',  // Emoji: Musical Notes
        followers: 89300,
        growth: '+28.9%',
        trend: 'up',
        engagement: 8.7,
        posts: 203
    }
];
let chartInstance = null;

// Format numbers with K/M suffix
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// Animate counter
function animateValue(id, start, end, duration = 1000) {
    const obj = document.getElementById(id);
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress * (2 - progress); // Smooth easing
        const value = Math.floor(ease * (end - start) + start);
        obj.textContent = formatNumber(value);

        if (progress < 1) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
}

// Render stat cards
function renderStats() {
    const grid = document.getElementById('statsGrid');
    grid.innerHTML = '';
    socialData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <div class="stat-header">
                <span class="platform-name">${data.platform}</span>
                <span class="platform-icon">${data.icon}</span>
            </div>
            <div class="stat-value">0</div>
            <div class="stat-label">Followers</div>
            <span class="trend ${data.trend}">${data.growth}</span>
        `;
        grid.appendChild(card);
    });
    // Animate follower counts
    setTimeout(() => {
        socialData.forEach((data, i) => {
            const valueEl = grid.children[i].querySelector('.stat-value');
            animateValue(valueEl.id = `followers-${i}`, 0, data.followers, 1200);
        });
    }, 100);
}

// Update engagement stats with animation
function updateEngagementStats() {
    const totalFollowers = socialData.reduce((sum, p) => sum + p.followers, 0);
    const avgEngagement = (socialData.reduce((sum, p) => sum + p.engagement, 0) / socialData.length).toFixed(1);

    animateValue('totalLikes', 0, Math.floor(totalFollowers * 0.05), 1200);
    animateValue('totalComments', 0, Math.floor(totalFollowers * 0.01), 1200);
    animateValue('totalShares', 0, Math.floor(totalFollowers * 0.008), 1200);
    animateValue('avgEngagement', 0, avgEngagement * 10, 1000); // Fake progress
    setTimeout(() => {
        document.getElementById('avgEngagement').textContent = avgEngagement + '%';
    }, 1100);
}

// Create or update chart with theme
function createChart() {
    const ctx = document.getElementById('engagementChart').getContext('2d');
    const isDark = document.body.classList.contains('dark-mode');

    const colors = isDark
        ? ['#E1306C', '#1DA1F2', '#4267B2', '#FF0000', '#0077B5', '#000000'].map(c => c + 'CC')
        : ['#E1306C', '#1DA1F2', '#4267B2', '#FF0000', '#0077B5', '#000000'];

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: socialData.map(d => d.platform),
            datasets: [{
                label: 'Engagement Rate (%)',
                data: socialData.map(d => d.engagement),
                backgroundColor: colors,
                borderRadius: 8,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.raw}% engagement`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: isDark ? '#334155' : '#e2e8f0' },
                    ticks: {
                        color: isDark ? '#cbd5e1' : '#64748b',
                        callback: value => value + '%'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: isDark ? '#cbd5e1' : '#64748b' }
                }
            }
        }
    });
}

// Theme toggle with persistence + chart update
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    createChart(); // Re-render chart with correct colors
}

// Load saved theme
function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dashboard
function init() {
    loadTheme();
    renderStats();
    updateEngagementStats();
    createChart();
}

// Start everything
document.addEventListener('DOMContentLoaded', init);
