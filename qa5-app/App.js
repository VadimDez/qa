import React from 'react';
import {
  StyleSheet,
  TabBarIOS
} from 'react-native';

import { Conetnt } from './Components/Content';
import { Camera } from './Components/Camera';
import { Report } from './Components/Report';


export default class App extends React.Component {
  

  constructor() {
    super();
    this.state = { selectedTab: 'check' };
  }

  selectTab = (selectedTab) => {
    this.setState({
      selectedTab
    });
  }
  
  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'check'}
          icon={{ uri: checkIcon }}
          onPress={() => {
            this.selectTab('check');
          }}>
          <Conetnt />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'cam'}
          icon={{ uri: cameraIcon }}
          onPress={() => {
            this.selectTab('cam');
          }}>
          <Camera/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'report'}
          icon={{ uri: reportIcon }}
          onPress={() => {
            this.selectTab('report');
          }}>
          <Report/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const cameraIcon  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGcSURBVEhL7dXPK0RRGMbxu0B+FZKFkgUrWdnY8CcQWdnIQhaiJBtlrYT8D5LEjtiwYJYWlKWSlVCSjSi/vw9z6nbmHd0zZnb3qU/dO++5950598y5UZo02ZSjIYE6FC3VuMVXQksoSlphNchnD0GpRJthBlaDfG7QBf8+LTBzBetGlk/c4Sn2WRLzyIk10HeEfmh2XPQoZnEP65oH6IvqeAM58S+Ie8ckXMqgqWv8OfuNjg8Rv+4MGqtfqvPgxq5pLVbxCFc7xyAU/QNO4GrX6MV29jyocQaKbnoKa4xoESqd0AxZY4IaD0BZgVV33tABZR/WmKDGVdBz0iKx6nHLUKZh1RM31kpVmmHVfbtQhmDVEzd+gVIPq+7bgjICqx401e1Q/lpYzjiURVj1oMZzUPrgNgLLBbSxaD1cZj/zBTXWomqCMoFX+GPU1M2M/vN+3QlqLMeogaIGC9jBOsZQAaUHz7DuIcGNRduf3jpWNL1T0GK0rnUKaiwfOIBeCsMYhTaWpG+2ghv/1xpyotWrzbxUNtGNNGlKmSj6BoTFgzgSGgmKAAAAAElFTkSuQmCC";
const checkIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGNSURBVEhL7da/LwRBGMbxQxQaDVoNjYgGoRS9ln8AndppJRRKLdGIQk2iopagVdISkUj8CBK/vk9yk2w27+y+s0c09ySfXLK5d9672dmZrbWSkPbG559nHOs4xw2+8IprHGARvfi1jOIE3w4vWEM3msoyPmA1KaJZGEGlbMEa1OsJ00iK/qk1WKo7DMKVMVSZ3phTtKE0x7AGaMYsCjMBqzCFpjc/YxcojB6FbEGqfXRiKXMt6Ec0Z8gXeKlpBxTridAGE80t8gUe2aYbsL6zCjPaez9hFWlrjK10T1PZQTRqkC94RA8m8dC4FnibyiaiuUK+4A3DUHRQhOYpTWUF0RzCKtK9H4Ki5ttIaSoziGYBVpHoKAzNQ7xNn9GFaPqgo80qlmxzb1PZQ2nKNhH9sMvctSLvGEBpdIhbi6wqvbW4o0Ncj5E1UIojhEXozhTuYQ3ooaaVX4F0b3SeWgPH6J5qnST/03x0iM9BR5vVKNCi24X7jSMlOtrmoQ1fm4i2wTq0ORQ+p638U2q1H6+ekzSJuLLdAAAAAElFTkSuQmCC";
const reportIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGASURBVEhL5dbPKwRhHMfxlUg5uYmSgxu58B+gXBxcSLk4cCMH/gNHR3ellOQqObg54qAcFErJFhEpkZ/vzzZfHvNjZ2YbY8unXrXz7Lf9bPvMs7uFf5saNOWgET9yiI8cvGMGX9nCbQ6uMI7qSNieZC2wx0rYnmRtFYGEDWatouIX3PnW0qqo+Bw674M489bSSlysc3fpPVaxpQU3cGd1VE5DvMFmEhXrbLejzbt2i5U52OwJ6hCWedhcbPEO9LEqVlxEj2MSNn8PbYH7vPRiAzYXW9ylBS9WnIWyxY+lq+80Y89xBPfFjG44d04O8AybKVusm6FBCxHpg82aY9QiLLOwudiPekILEVmGOysPGEG/zwA2YXOxxToqnfBnDDpi7mwascXyhEUMYRRr8M+klaj4N/xZ8QoC2UfYcJamEIi+KJawnsA29ELXzlo5uj/0XyvqyCVON1S8W7rKMXY2XzGshTzSCtsz0ZvIJfW4gBUvILd0QF8u04j6Ha7GFAqfV16lFDTmYiIAAAAASUVORK5CYII=";