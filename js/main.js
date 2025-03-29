// 宣告全域變數
let scene, camera, renderer;
let cube;
let mouseX = 0, mouseY = 0;

init();
animate();

function init() {
  // 建立場景
  scene = new THREE.Scene();

  // 建立攝影機 (視角、寬高比、近截面、遠截面)
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // 建立 WebGL 渲染器並設定大小
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  // 建立一個立方體 (幾何體與材質)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 監聽視窗大小變更，調整攝影機與渲染器
  window.addEventListener('resize', onWindowResize, false);
  // 監聽滑鼠移動事件
  document.addEventListener('mousemove', onDocumentMouseMove, false);
}

// 視窗尺寸變動時更新攝影機與渲染器尺寸
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 滑鼠移動時更新 mouseX 與 mouseY
function onDocumentMouseMove(event) {
  // 計算滑鼠相對於畫面中心的偏移量
  mouseX = (event.clientX - window.innerWidth / 2);
  mouseY = (event.clientY - window.innerHeight / 2);
}

function animate() {
  // 進行無限循環渲染
  requestAnimationFrame(animate);
  
  // 根據滑鼠移動更新立方體的旋轉
  cube.rotation.x = mouseY * 0.001;
  cube.rotation.y = mouseX * 0.001;
  
  // 渲染場景與攝影機
  renderer.render(scene, camera);
}
