        const itemsContainer = document.getElementById('itemsContainer');
        for (let i = 0; i < 9; i++) { // 循环次数为12
            const item = document.createElement('div');
            item.className = 'item';
            item.tabIndex = 0;
            const imageUrl = `url(works/000${i + 1}.png)`; // 动态生成图片URL
            item.style.backgroundImage = imageUrl;
            itemsContainer.appendChild(item);
        }
