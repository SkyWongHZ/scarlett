# 适配react native下ipnonex尺寸


```plain
'use strict';
import { 
  Dimensions, 
  Platform, 
  PixelRatio, 
  NativeModules,
  DeviceInfo 
} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XMS_WIDTH = 414;
const XMS_HEIGHT = 896;

const { width, height } = Dimensions.get('window');
const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};


const Platforms = {
  IOS: 'ios',
  ANDROID: 'android',
  WEB: 'web',
};

// iphoneX 和 iPHone XS 一样都有齐刘海 统一按X处理
function isIphoneX () {
  if (Platform.OS === Platforms.WEB) return false;
  
  if (minor >= 50) {
    return DeviceInfo.isIPhoneX_deprecated;
  }
  
  return (Platform.OS === Platforms.IOS && ((height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT))
  );
}

function isIphoneXR () {
  if (Platform.OS === Platforms.WEB) return false;
  return (Platform.OS === Platforms.IOS && ((height >= XMS_HEIGHT && width >= XMS_WIDTH) || (height >= XMS_WIDTH && width >= XMS_HEIGHT)));
};

function statusBarHeightForIOS () {
  if (isIphoneX() || isIphoneXR()) return 44;
  return 20;
}

const scale = uiWidth => {
  const screenWidth = width < height ? width : height;
  return Math.floor((screenWidth / 375) * uiWidth);
};

const Device = {
  isIphoneX: _ => (isIphoneXR() || isIphoneX()),
  isIphoneXR:_=>isIphoneXR(),
  width,
  height,
  isIOS: Platform.OS === Platforms.IOS,
  scale: uiWidth => {
    const width = Dimensions.get(Platform.OS === Platforms.IOS ? 'window' : 'window').width;
    return (width / 375) * uiWidth;
  },
  statusBarHeight: Platform.OS === Platforms.IOS ? statusBarHeightForIOS() : scale(18),
  navBarHeight: Platform.OS === Platforms.IOS ? scale(44) + statusBarHeightForIOS() : scale(65),
  fontSizeScale: fontSize => Math.round(fontSize * (PixelRatio.get() / PixelRatio.getFontScale())),
  fixedStyle: (style) => {
    const sty = style || {};
    if (Platform.OS === Platforms.IOS) {
      return [sty, { flex: 1 }];
    }
    return [sty, { height: Dimensions.get('window').height }];
  }
};

export default Device;
```






