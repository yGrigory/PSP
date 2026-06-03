const DEFAULT_GLB_URL =
  "./models/icebreaker.glb";

export default class ProductModel {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
      <section class="lab3-model-wrap">
        <h4>3D модель ледокольного сервиса</h4>
        <div class="lab3-model-view" id="lab3_model_canvas"></div>
        <div class="lab3-model-controls">
          <button type="button" class="site-btn lab3-model-btn" data-view="front">Спереди</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="back">Сзади</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="left">Слева</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="right">Справа</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="zoom-in">+</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="zoom-out">-</button>
        </div>
      </section>
    `;
  }

  async render() {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());

    const canvasHost = document.getElementById("lab3_model_canvas");
    if (!canvasHost) {
      return;
    }

    const [{ Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Box3, Vector3 }, { GLTFLoader }, { OrbitControls }] =
      await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
        import("three/examples/jsm/controls/OrbitControls.js")
      ]);

    const scene = new Scene();
    const camera = new PerspectiveCamera(50, canvasHost.clientWidth / 280, 0.1, 1000);
    camera.position.set(0, 2, 5);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasHost.clientWidth, 280);
    canvasHost.appendChild(renderer.domElement);

    scene.add(new AmbientLight(0xffffff, 1.1));
    const sunLight = new DirectionalLight(0xffffff, 1.4);
    sunLight.position.set(8, 10, 6);
    scene.add(sunLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.target.set(0, 1, 0);
    controls.update();
    controls.addEventListener("change", () => renderer.render(scene, camera));

    const loader = new GLTFLoader();
    loader.load(
      DEFAULT_GLB_URL,
      (gltf) => {
        const glbObject = gltf.scene;
        scene.add(glbObject);

        glbObject.scale.setScalar(2.2);

        const objectBounds = new Box3().setFromObject(glbObject);
        const objectSize = objectBounds.getSize(new Vector3());
        const objectCenter = objectBounds.getCenter(new Vector3());

        glbObject.position.sub(objectCenter);
        glbObject.position.y += objectSize.y / 2;

        const fitDistance = Math.max(objectSize.x, objectSize.y, objectSize.z) * 1.2 || 4;
        camera.position.set(0, objectSize.y * 0.7, fitDistance);
        controls.target.set(0, objectSize.y / 2, 0);
        controls.update();
        renderer.render(scene, camera);
      },
      undefined,
      () => {
        canvasHost.innerHTML = "<p>Не удалось загрузить 3D модель.</p>";
      }
    );

    this.parent.querySelectorAll(".lab3-model-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.dataset.view;
        const delta = 0.7;
        const radius = Math.max(Math.hypot(camera.position.x, camera.position.z), 3);

        if (mode === "front") {
          camera.position.set(0, camera.position.y, radius);
        } else if (mode === "back") {
          camera.position.set(0, camera.position.y, -radius);
        } else if (mode === "left") {
          camera.position.set(-radius, camera.position.y, 0);
        } else if (mode === "right") {
          camera.position.set(radius, camera.position.y, 0);
        } else if (mode === "zoom-in") {
          camera.position.multiplyScalar(1 - delta * 0.1);
        } else if (mode === "zoom-out") {
          camera.position.multiplyScalar(1 + delta * 0.1);
        }

        controls.update();
        renderer.render(scene, camera);
      });
    });
  }
}
