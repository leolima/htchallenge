import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  ConeGeometry,
  DodecahedronGeometry,
  BasicShadowMap,
  BoxGeometry,
} from 'three';
import {Renderer} from 'expo-three';
import {GLView} from 'expo-gl';
import {Controls} from './components/Controls';

const App = () => {
  const onContextCreate = async gl => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000,
    );
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };

    camera.position.z = 7;

    const renderer = new Renderer({gl});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = BasicShadowMap;
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // --- Materials --
    const geometry = new BoxGeometry(1.4, 1.4, 1.4);
    const material = new MeshBasicMaterial({color: 'red'});
    const cube = new Mesh(geometry, material);
    cube.position.y = 3;

    const coneGeo = new ConeGeometry(1, 2);
    const coneMaterial = new MeshBasicMaterial({color: 'blue'});
    const cone = new Mesh(coneGeo, coneMaterial);
    cone.position.y = 0;

    const dodecagonoGeo = new DodecahedronGeometry(1, 0);
    const dodecagonoMaterial = new MeshBasicMaterial({color: 'green'});
    const dodecagono = new Mesh(dodecagonoGeo, dodecagonoMaterial);
    dodecagono.position.y = -3;

    scene.add(cube);
    scene.add(cone);
    scene.add(dodecagono);

    const render = () => {
      requestAnimationFrame(render);

      cube.rotation.x += 0.001;
      cube.rotation.y += 0.01;

      cone.rotation.x += 0.01;
      cone.rotation.y += 0.01;

      dodecagono.rotation.x += 0.01;
      dodecagono.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return (
    <View style={styles.flex}>
      <GLView
        onContextCreate={onContextCreate}
        // set height and width of GLView
        style={{width: 400, height: 600, borderColor: 'black', borderWidth: 1}}
      />
      <Controls />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
});

export default App;
