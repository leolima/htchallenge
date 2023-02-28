import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  ConeGeometry,
  DodecahedronGeometry,
  BasicShadowMap,
  BoxGeometry,
  Color,
} from 'three';
import {Renderer} from 'expo-three';
import {GLView} from 'expo-gl';
import {Controls} from './components/Controls';
import {FirebaseContext} from '../contexts/FirebaseContext';

const App = () => {
  const [shapes, setShapes] = useState({});
  const {userData} = useContext(FirebaseContext);

  const onContextCreate = useCallback(
    async gl => {
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

      const dodecaedroGeo = new DodecahedronGeometry(1, 0);
      const dodecaedroMaterial = new MeshBasicMaterial({color: 'green'});
      const dodecaedro = new Mesh(dodecaedroGeo, dodecaedroMaterial);
      dodecaedro.position.y = -3;

      setShapes({cube, cone, dodecaedro});
      scene.add(cube);
      scene.add(cone);
      scene.add(dodecaedro);

      const render = () => {
        requestAnimationFrame(render);

        cube.rotation.x += 0.001;
        cube.rotation.y += 0.01;

        cone.rotation.x += 0.01;
        cone.rotation.y += 0.01;

        dodecaedro.rotation.x += 0.01;
        dodecaedro.rotation.y += 0.01;

        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      render();
    },
    [userData],
  );

  useEffect(() => {
    if (userData && shapes?.cube && shapes?.cone && shapes?.dodecaedro) {
      shapes.cube.material.color = new Color(userData?.cubo || 'red');
      shapes.cone.material.color = new Color(userData?.cone || 'yellow');
      shapes.dodecaedro.material.color = new Color(
        userData?.dodecaedro || 'green',
      );
    }
  }, [userData]);

  return (
    <ScrollView style={styles.flex}>
      <GLView
        onContextCreate={onContextCreate}
        style={{
          width: 400,
          height: 600,
          borderColor: 'black',
          borderWidth: 1,
        }}
      />
      <Controls />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});

export default App;
