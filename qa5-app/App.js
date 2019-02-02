import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Card, ListItem, Button, Icon, Header, Avatar } from 'react-native-elements';
import ExpoGraphics from 'expo-graphics';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import Expo, { setPixelRatio } from 'expo';

import TextMesh from './TextMesh';
import { Conetnt } from './Content';


export default class App extends React.Component {
  magneticObject = new ThreeAR.MagneticObject();

  constructor() {
    super();
    this.state = { isCameraShown: false };
  }
 
  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true)
    ThreeAR.suppressWarnings()
  }
  onPress() {

  }


  onToggleCamera = () => {
    this.setState({ isCameraShown: !this.state.isCameraShown });
  }
  
  render() {
    
    if (!this.state.isCameraShown) {
      return <Conetnt onToggleCamera={ this.onToggleCamera } />
    }

    return this.renderfn();
  }

  renderfn() {
    return (
      <View style={{flex:1}}>
      <ExpoGraphics.View
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onResize={this.onResize}
        isArEnabled
        isArRunningStateEnabled
        isArCameraStateEnabled
      />
      </View>
    )
 }
 onContextCreate = async ({gl, scale: pixelRatio, width, height, arSession}) => {
  // Initialize renderer…
  this.renderer = new ExpoTHREE.Renderer({
    gl,
    pixelRatio,
    width,
    height,
  });
  // this.renderer.setPixelRatio(pixelRatio);
  // this.renderer.setSize(width, height);

  // Initialize scene…
  this.scene = new THREE.Scene();
  this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
  // Initialize camera…
  this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

  // Initialize lighting…
  var ambientLight = new THREE.AmbientLight(0xaaaaaa);
  this.scene.add(ambientLight);


  this.mesh = new THREE.Object3D();
  this.shadowFloor = new ThreeAR.ShadowFloor({
    width: 1,
    height: 1,
    opacity: 0.6,
  });
  this.mesh.add(this.shadowFloor);

  // Don't scale up with distance
  this.magneticObject.maintainScale = false;

  this.magneticObject.add(this.mesh);

  this.scene.add(this.magneticObject);

  this.createText();
 }

  onResize = ({ x, y, scale, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = () => {
    // this.magneticObject.update(this.camera, this.screenCenter);

    // this.shadowLight.target.position.copy(this.magneticObject.position);
    this.renderer.render(this.scene, this.camera);
  };

  createText = () => {
    this.textMesh = new TextMesh();
    this.textMesh.rotation.y = Math.PI;
    this.scene.add(this.textMesh);
    this.textMesh.material = new THREE.MeshPhongMaterial({ color: 0x056ecf });
    this.textMesh.update({
      text: 'Welcome',
      font: require('./three_fonts/neue_haas_unica_pro_medium.json'), // This accepts json, THREE.Font, or a uri to remote THREE.Font json
      size: 10, //Size of the text. Default is 100.
      height: 5, //Thickness to extrude text. Default is 50.
      curveSegments: 12, // — Integer. Number of points on the curves. Default is 12.
      bevelEnabled: false, // — Boolean. Turn on bevel. Default is False.
      bevelThickness: 1, // — Float. How deep into text bevel goes. Default is 10.
      bevelSize: 0.8, // — Float. How far from text outline is bevel. Default is 8.
      bevelSegments: 0.3, // — Integer. Number of bevel segments. Default is 3.
    });
    ExpoTHREE.utils.scaleLongestSideToSize(this.textMesh, 5);
    ExpoTHREE.utils.alignMesh(this.textMesh, { y: 1, x: 0.5, z: 0.5 });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: 'white',
    width: '100%'
  },
  title: {},
  instructions: {
    flex: 1,
    width: '100%'
  }
});