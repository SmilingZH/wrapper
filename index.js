const itemsContainer = document.getElementById('itemsContainer');
        for (let i = 0; i < 9; i++) { // 循环次数为9
            const item = document.createElement('div');
            item.className = 'item';
            item.tabIndex = 0;
            const imageUrl = `url(works/000${i + 1}.png)`; // 动态生成图片URL
            item.style.backgroundImage = imageUrl;
            itemsContainer.appendChild(item);

            let isZoomed = false;
            let canvasAdded = false;

            item.addEventListener('click', () => {
                if (!isZoomed) {
                    // 放大图片
                    item.style.transform = 'translateZ(calc(var(--index) * 10))';
                    item.style.filter = 'inherit';
                    isZoomed = true;
                } else {
                    if (!canvasAdded) {
                        // 创建并添加canvas
                        const canvas = document.createElement('canvas');
                        // 获取图片的实际尺寸
                        const img = new Image();
                        img.src = imageUrl.replace('url(', '').replace(')', '');
                        img.onload = () => {
                            // 动态调整canvas的大小
                            canvas.width = item.clientWidth; // 修改canvas宽度为item的宽度
                            canvas.height = item.clientHeight; // 修改canvas高度为item的高度
                            // 将canvas添加到图片所在的div元素内部
                            item.appendChild(canvas);
                            canvasAdded = true;

                            // 设置canvas样式以覆盖图片
                            canvas.style.position = 'absolute';
                            canvas.style.top = '0';
                            canvas.style.left = '0';
                            canvas.style.width = '100%';
                            canvas.style.height = '100%';
                            canvas.style.zIndex = '1';

                            // 这里可以添加Three.js的初始化代码来创建画中世界
                            const scene = new THREE.Scene();
                            const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
                            const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
                            renderer.setSize(canvas.width, canvas.height);

                            // 创建OrbitControls
                            // const controls = new THREE.OrbitControls(camera, renderer.domElement);
                            // controls.enableDamping = true; // 启用阻尼效果
                            // controls.dampingFactor = 0.25; // 设置阻尼因子
                            // controls.enableZoom = true; // 启用缩放

                            // 创建一个立方体作为示例物体
                            const geometry = new THREE.BoxGeometry(10, 10, 10);
                            const material = new THREE.MeshBasicMaterial({ color: getRandomColor() }); // 使用随机颜色
                            const cube = new THREE.Mesh(geometry, material);
                            scene.add(cube);

                            // 调整相机位置以确保看到物体
                            camera.position.z = 20;

                            function animate() {
                                requestAnimationFrame(animate);

                                // // 更新控制器
                                // controls.update();

                                cube.rotation.x += 0.01;
                                cube.rotation.y += 0.01;

                                renderer.render(scene, camera);
                            }

                            animate();
                        };
                    } else {
                        // 移除canvas元素
                        const canvas = item.querySelector('canvas');
                        if (canvas) {
                            item.removeChild(canvas);
                            canvasAdded = false;
                        }
                    }
                }
            });

            // 添加点击其他区域重置图片状态的事件监听
            document.addEventListener('click', (event) => {
                if (isZoomed && event.target !== item && !item.contains(event.target)) {
                    // 重置图片状态
                    item.style.transform = '';
                    // 移除canvas元素
                    const canvas = item.querySelector('canvas');
                    if (canvas) {
                        item.removeChild(canvas);
                        canvasAdded = false;
                    }
                }
            });
        }

        const fullscreenButton = document.getElementById('fullscreenButton');

        fullscreenButton.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().then(() => {
                    fullscreenButton.textContent = '退出全屏';
                }).catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen().then(() => {
                        fullscreenButton.textContent = '横屏看体验更好哦~~';
                    }).catch(err => {
                        console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
                    });
                }
            }
        });

        // 创建一个函数来生成随机颜色
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '0x';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return parseInt(color, 16);
        }
