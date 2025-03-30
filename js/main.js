// 宣告全域變數
let scene, camera, renderer;
let cube;
let mouseX = 0, mouseY = 0;
const textureLoader = new THREE.TextureLoader();

init();
animate();

function init() {
  // 建立場景與攝影機
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // 建立 WebGL 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  // 建立立方體幾何體
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // 載入預設飲料貼圖 (drink1.jpg)
  textureLoader.load('assets/drinks/drink1.jpg', function(texture) {
    const material = new THREE.MeshBasicMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  });

  // 監聽視窗大小變更與滑鼠移動事件
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  // 監聽下拉選單變更，切換飲料展示
  document.getElementById('drinkSelect').addEventListener('change', onDrinkChange, false);
}

// 更新視窗尺寸
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 滑鼠移動事件，計算相對畫面中心的偏移量
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - window.innerWidth / 2);
  mouseY = (event.clientY - window.innerHeight / 2);
}

// 下拉選單變更事件，依選項載入對應飲料貼圖
function onDrinkChange(event) {
  const selectedDrink = event.target.value; // 取得選項值 (例如：drink1.jpg)
  changeDrinkTexture('assets/drinks/' + selectedDrink);
}

// 載入並更換立方體的貼圖
function changeDrinkTexture(imagePath) {
  if (!cube) return; // 若 cube 尚未建立則跳過
  textureLoader.load(imagePath, function(texture) {
    cube.material.map = texture;
    cube.material.needsUpdate = true;
  });
}

// 動畫迴圈，持續更新場景與物件旋轉
function animate() {
  requestAnimationFrame(animate);
  if (cube) {
    cube.rotation.x = mouseY * 0.001;
    cube.rotation.y = mouseX * 0.001;
  }
  renderer.render(scene, camera);
}
