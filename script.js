// Mock data for social media platforms
        const socialData = [
            {
                platform: 'Instagram',
                icon: '📷',
                followers: 45230,
                growth: '+12.5%',
                trend: 'up',
                engagement: 4.8,
                posts: 156
            },
            {
                platform: 'Twitter',
                icon: '🐦',
                followers: 28940,
                growth: '+8.3%',
                trend: 'up',
                engagement: 3.2,
                posts: 432
            },
            {
                platform: 'Facebook',
                icon: '👍',
                followers: 62100,
                growth: '-2.1%',
                trend: 'down',
                engagement: 2.1,
                posts: 89
            },
            {
                platform: 'YouTube',
                icon: '▶️',
                followers: 12500,
                growth: '+15.7%',
                trend: 'up',
                engagement: 6.5,
                posts: 34
            },
            {
                platform: 'LinkedIn',
                icon: '💼',
                followers: 8720,
                growth: '+5.4%',
                trend: 'up',
                engagement: 5.2,
                posts: 67
            },
            {
                platform: 'TikTok',
                icon: '🎵',
                followers: 89300,
                growth: '+28.9%',
                trend: 'up',
                engagement: 8.7,
                posts: 203
            }
        ];

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
                    <div class="stat-value">${formatNumber(data.followers)}</div>
                    <div class="stat-label">Followers</div>
                    <span class="trend ${data.trend}">${data.growth}</span>
                `;
                grid.appendChild(card);
            });

            updateEngagementStats();
        }

        // Format numbers with K/M suffix
        function formatNumber(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            }
            if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toString();
        }

        // Update engagement statistics
        function updateEngagementStats() {
            const totalFollowers = socialData.reduce((sum, p) => sum + p.followers, 0);
            const avgEngagement = (socialData.reduce((sum, p) => sum + p.engagement, 0) / socialData.length).toFixed(1);
            
            document.getElementById('totalLikes').textContent = formatNumber(Math.floor(totalFollowers * 0.05));
            document.getElementById('totalComments').textContent = formatNumber(Math.floor(totalFollowers * 0.01));
            document.getElementById('totalShares').textContent = formatNumber(Math.floor(totalFollowers * 0.008));
            document.getElementById('avgEngagement').textContent = avgEngagement + '%';
        }

        // Create engagement chart
        function createChart() {
            const ctx = document.getElementById('engagementChart').getContext('2d');
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: socialData.map(d => d.platform),
                    datasets: [{
                        label: 'Engagement Rate (%)',
                        data: socialData.map(d => d.engagement),
                        backgroundColor: [
                            '#E1306C',
                            '#1DA1F2',
                            '#4267B2',
                            '#FF0000',
                            '#0077B5',
                            '#000000'
                        ],
                        borderRadius: 8,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Theme toggle
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
        }

        // Initialize dashboard
        renderStats();
        createChart();
