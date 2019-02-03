import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import ExpoGraphics from 'expo-graphics';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import Expo, { setPixelRatio, Camera as Cam, Permissions } from 'expo';
import { Avatar, Badge, Icon, withBadge, ListItem, Overlay } from 'react-native-elements'


import TextMesh from './TextMesh';

export class Camera extends React.Component {
  magneticObject = new ThreeAR.MagneticObject();
  state = {
    hasCameraPermission: false,
    type: Cam.Constants.Type.back,
  };

  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true)
    ThreeAR.suppressWarnings()

    Permissions.getAsync(Permissions.CAMERA).then(async r => {
      let status = r.status;
      if (status != 'granted') {
        const res = await Permissions.askAsync(Permissions.CAMERA);
        status = res.status;
      }
      this.setState({ hasCameraPermission: status === 'granted' });
    });
  }

  onPress() {
  }

  checkPhoto = async () => {
    let photo = null;
    
    if (this.camera) {
      try {
        this.setState({ takingPicture: true })
        photo = await this.camera.takePictureAsync();
      } finally {
        this.setState({ takingPicture: false });
      }


      console.log(photo);
      if (photo) {
        this.setState({ isUploading: true })
        let res
        try {
          res = await this.uploadPhoto(photo.uri);
          res = await res.json();
        } finally {
          this.setState({ isUploading: false })
        }
        console.log('============');

        console.log(res);
        console.log(res.images[0].classifiers[0].classes);

        if (res && res.images && res.images[0] && res.images[0].classifiers && res.images[0].classifiers[0].classes && res.images[0].classifiers[0].classes[0]) {
          const cl = res.images[0].classifiers[0].classes[0];
          if (cl.class === 'positive' && cl.score < 0.70) {
            alert('wrong');
          } else {
            alert('correct');
          }
        }
        console.log('============');
      }
    }
  }


  uploadPhoto(uri) {
    let formData = new FormData();
    formData.append('images_file', {
      uri,
      name: `photo.jpg`,
      type: `image/jpg`,
    });
    formData.append('threshold', 0.6);
    formData.append('classifier_ids', "DefaultCustomModel_941899808");

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic YXBpa2V5OjlPVmlGY0NxUWVfZ3Zfbk1WUzY1a0ppX180aVRrVFFGQ1pmc3B0dFlyU04t`
      },
    };

    return fetch('https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19', options);
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (!hasCameraPermission) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No access to camera</Text>
        </View>
      );
    }
    
    return (
      <TouchableOpacity style={{ flex: 1 }}>
        <Cam style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
            onPress={this.checkPhoto}
            >
            <View>
              <ListItem
                leftAvatar={{
                  title: 'ok',
                  source: { uri: 'https://randomuser.me/api/portraits/men/41.jpg' },
                  showEditButton: false,
                }}
                title={'title'}
                subtitle={'subtitle'}
              />
            </View>
          </TouchableOpacity>
        </Cam>
      </TouchableOpacity>
    );
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

    var geometry = new THREE.BoxGeometry( .25, .25, .25 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );

    // console.log(cube.position.get());

    cube.position.set(0, 0, 0);
    cube.position.setX(1);

    // this.createText();
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
        font: require('../three_fonts/neue_haas_unica_pro_medium.json'), // This accepts json, THREE.Font, or a uri to remote THREE.Font json
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