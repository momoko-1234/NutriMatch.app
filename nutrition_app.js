// 營養知識圖譜轉譯器 APP 交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 添加頁面載入動畫
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 800);
    
    // 初始化營養素雷達圖
    initNutritionRadarChart();
    
    // 詳情按鈕點擊事件
    const detailButton = document.querySelector('.detail-button');
    if (detailButton) {
        detailButton.addEventListener('click', function(e) {
            e.preventDefault();
            showDetailModal();
        });
    }
    
    // 營養素項目點擊事件
    const nutritionItems = document.querySelectorAll('.nutrition-item');
    nutritionItems.forEach(item => {
        item.addEventListener('click', function() {
            const nutritionName = this.querySelector('.nutrition-name').textContent;
            showNutritionDetail(nutritionName);
        });
    });
    
    // 健康目標標籤點擊事件
    const goalTags = document.querySelectorAll('.goal-tag');
    goalTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const goalName = this.textContent.replace('#', '');
            showGoalDetail(goalName);
        });
    });
    
    // 風險提醒展開/收起功能
    const riskAlerts = document.querySelectorAll('.risk-alert');
    riskAlerts.forEach(alert => {
        const title = alert.querySelector('.risk-title');
        const content = alert.querySelector('.risk-content');
        
        // 初始狀態設為收起（僅在移動設備上）
        if (window.innerWidth < 480) {
            content.style.display = 'none';
            title.classList.add('collapsed');
        }
        
        title.addEventListener('click', function() {
            if (window.innerWidth < 480) {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    title.classList.remove('collapsed');
                } else {
                    content.style.display = 'none';
                    title.classList.add('collapsed');
                }
            }
        });
    });
    
    // 飲食與生活方式建議標籤切換
    const adviceTabs = document.querySelectorAll('.advice-tab');
    if (adviceTabs.length > 0) {
        adviceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有活動狀態
                adviceTabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.advice-content').forEach(c => c.classList.remove('active'));
                
                // 添加當前活動狀態
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
    }
    
    // 飲食與生活方式建議標籤切換 - 新增的區塊
    const dietTabs = document.querySelectorAll('.diet-lifestyle-tabs .tab');
    const dietContents = document.querySelectorAll('.diet-lifestyle-content .content-panel');
    
    dietTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有標籤的活動狀態
            dietTabs.forEach(t => t.classList.remove('active'));
            // 添加當前標籤的活動狀態
            tab.classList.add('active');
            
            // 隱藏所有內容面板
            dietContents.forEach(content => content.classList.remove('active'));
            // 顯示對應的內容面板
            const targetPanel = document.getElementById(tab.getAttribute('data-target'));
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    
    // 默認顯示第一個標籤內容
    if (dietTabs.length > 0 && dietContents.length > 0) {
        dietTabs[0].classList.add('active');
        dietContents[0].classList.add('active');
    }
    
    // 初始化營養素雷達圖
    initNutritionRadarChart();
});

// 顯示營養素詳情模態框
function showNutritionDetail(nutritionName) {
    // 根據不同營養素顯示不同的詳細信息
    let detailContent = '';
    
    switch(nutritionName) {
        case '維生素B群':
            detailContent = `
                <h3>維生素B群</h3>
                <p class="detail-description">維生素B群是一組水溶性維生素，在能量代謝和神經系統功能中扮演重要角色。</p>
                <div class="detail-section">
                    <h4>主要功效</h4>
                    <ul>
                        <li>促進能量代謝</li>
                        <li>支持神經系統健康</li>
                        <li>幫助紅血球形成</li>
                        <li>減輕疲勞和壓力</li>
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>食物來源</h4>
                    <ul>
                        <li>全穀類食品</li>
                        <li>豆類和堅果</li>
                        <li>綠葉蔬菜</li>
                        <li>肉類和魚類</li>
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>建議攝取量</h4>
                    <p>根據您的健康狀況，建議每日攝取維生素B複合物補充劑，特別是B1、B6和B12。</p>
                </div>
            `;
            break;
        case '維生素C':
            detailContent = `
                <h3>維生素C</h3>
                <p class="detail-description">維生素C是一種強效抗氧化劑，有助於免疫系統功能和膠原蛋白合成。</p>
                <div class="detail-section">
                    <h4>主要功效</h4>
                    <ul>
                        <li>增強免疫系統</li>
                        <li>促進膠原蛋白生成</li>
                        <li>幫助傷口癒合</li>
                        <li>改善口腔黏膜健康</li>
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>食物來源</h4>
                    <ul>
                        <li>柑橘類水果</li>
                        <li>草莓和奇異果</li>
                        <li>彩椒</li>
                        <li>花椰菜和綠葉蔬菜</li>
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>建議攝取量</h4>
                    <p>考慮到您的嘴破症狀，建議每日攝取500-1000mg的維生素C，分次服用以提高吸收率。</p>
                </div>
            `;
            break;
        // 其他營養素的詳情...
        default:
            detailContent = `<h3>${nutritionName}</h3><p>詳細資訊正在更新中...</p>`;
    }
    
    showModal(detailContent);
}

// 顯示健康目標詳情
function showGoalDetail(goalName) {
    let detailContent = '';
    
    switch(goalName) {
        case '睡眠品質':
            detailContent = `
                <h3>睡眠品質改善計劃</h3>
                <p class="detail-description">針對您常熬夜的情況，我們提供以下改善睡眠品質的建議。</p>
                <div class="detail-section">
                    <h4>營養建議</h4>
                    <ul>
                        <li>睡前1小時補充含色胺酸的食物（如香蕉、牛奶）</li>
                        <li>適量補充褪黑激素</li>
                        <li>晚餐避免咖啡因和刺激性食物</li>
                        <li>補充鎂元素幫助肌肉放鬆</li>
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>生活習慣調整</h4>
                    <ul>
                        <li>建立規律的睡眠時間表</li>
                        <li>睡前減少藍光暴露</li>
                        <li>睡前進行放鬆活動（如冥想、深呼吸）</li>
                        <li>保持臥室環境舒適、安靜和黑暗</li>
                    </ul>
                </div>
            `;
            break;
        // 其他健康目標的詳情...
        default:
            detailContent = `<h3>${goalName}</h3><p>詳細資訊正在更新中...</p>`;
    }
    
    showModal(detailContent);
}

// 顯示詳情模態框
function showDetailModal() {
    const detailContent = `
        <h3>營養素詳細資訊</h3>
        <p class="detail-description">根據您的個人資料和健康狀況，我們為您提供以下營養建議。</p>
        
        <div class="detail-tabs">
            <button class="tab-btn active" data-tab="nutrients">推薦營養素</button>
            <button class="tab-btn" data-tab="foods">推薦食物</button>
            <button class="tab-btn" data-tab="plan">每日攝取計劃</button>
        </div>
        
        <div class="tab-content active" id="nutrients-content">
            <div class="detail-item">
                <h4>維生素B群</h4>
                <p>每日建議攝取量：B1 1.1mg, B6 1.5mg, B12 2.4μg</p>
                <p>適合您的原因：幫助能量代謝，改善疲勞感，支持神經系統健康</p>
            </div>
            <div class="detail-item">
                <h4>維生素C</h4>
                <p>每日建議攝取量：500-1000mg</p>
                <p>適合您的原因：促進口腔黏膜修復，增強免疫力，抗氧化</p>
            </div>
            <!-- 其他營養素詳情 -->
        </div>
        
        <div class="tab-content" id="foods-content">
            <div class="food-category">
                <h4>富含維生素B群的食物</h4>
                <div class="food-items">
                    <div class="food-item">全穀類麵包</div>
                    <div class="food-item">豆類</div>
                    <div class="food-item">堅果</div>
                    <div class="food-item">瘦肉</div>
                    <div class="food-item">魚類</div>
                </div>
            </div>
            <div class="food-category">
                <h4>富含維生素C的食物</h4>
                <div class="food-items">
                    <div class="food-item">柑橘類水果</div>
                    <div class="food-item">奇異果</div>
                    <div class="food-item">草莓</div>
                    <div class="food-item">彩椒</div>
                    <div class="food-item">花椰菜</div>
                </div>
            </div>
            <!-- 其他食物類別 -->
        </div>
        
        <div class="tab-content" id="plan-content">
            <h4>每日營養攝取計劃</h4>
            <div class="meal-plan">
                <div class="meal">
                    <h5>早餐</h5>
                    <p>全穀類麥片 + 牛奶 + 奇異果</p>
                    <p class="meal-benefit">提供維生素B群、維生素C和優質蛋白質</p>
                </div>
                <div class="meal">
                    <h5>午餐</h5>
                    <p>糙米飯 + 蒸魚 + 綠葉蔬菜 + 彩椒</p>
                    <p class="meal-benefit">提供複合碳水化合物、優質蛋白質和豐富維生素</p>
                </div>
                <div class="meal">
                    <h5>晚餐</h5>
                    <p>藜麥沙拉 + 烤雞胸肉 + 水果</p>
                    <p class="meal-benefit">提供低GI碳水化合物、優質蛋白質和抗氧化物質</p>
                </div>
                <div class="meal">
                    <h5>加餐</h5>
                    <p>堅果 + 優格 + 蜂蜜</p>
                    <p class="meal-benefit">提供健康脂肪、益生菌和能量</p>
                </div>
            </div>
        </div>
    `;
    
    showModal(detailContent);
    
    // 添加標籤切換功能
    setTimeout(() => {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有活動狀態
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // 添加當前活動狀態
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
    }, 100);
}

// 通用模態框顯示函數
function showModal(content) {
    // 檢查是否已存在模態框
    let modal = document.querySelector('.modal-container');
    
    if (!modal) {
        // 創建模態框
        modal = document.createElement('div');
        modal.className = 'modal-container';
        document.body.appendChild(modal);
    }
    
    // 設置模態框內容
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // 顯示模態框
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 關閉按鈕事件
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // 阻止冒泡
    modal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 添加ESC鍵關閉功能
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 初始化營養素雷達圖
function initNutritionRadarChart() {
    const ctx = document.getElementById('nutritionRadarChart');
    if (!ctx) return;
    
    // 營養素數據
    const nutritionData = {
        labels: ['維生素B群', '維生素C', '維生素D', '褪黑激素', '益生菌', '鎂', '鋅'],
        datasets: [
            {
                label: '基礎需求',
                data: [70, 85, 65, 60, 75, 55, 60],
                backgroundColor: 'rgba(187, 255, 228, 0.6)',
                borderColor: 'rgba(187, 255, 228, 1)',
                pointBackgroundColor: 'rgba(187, 255, 228, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(187, 255, 228, 1)'
            },
            {
                label: '健康目標',
                data: [90, 95, 75, 85, 80, 70, 75],
                backgroundColor: 'rgba(44, 122, 100, 0.6)',
                borderColor: 'rgba(44, 122, 100, 1)',
                pointBackgroundColor: 'rgba(44, 122, 100, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(44, 122, 100, 1)'
            }
        ]
    };
    
    // 雷達圖配置
    const config = {
        type: 'radar',
        data: nutritionData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    pointLabels: {
                        font: {
                            family: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
                            size: 14
                        },
                        color: '#2d3436'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#636e72',
                        font: {
                            size: 10
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2c7a64',
                    bodyColor: '#2d3436',
                    borderColor: 'rgba(187, 255, 228, 0.5)',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        title: function(tooltipItems) {
                            return tooltipItems[0].label;
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.r !== null) {
                                label += context.parsed.r + '%';
                            }
                            return label;
                        }
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    };
    
    // 創建雷達圖
    new Chart(ctx, config);
}

// 添加頁面滾動動畫
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});