// @flow
import initUppy from '../../lib/init-uppy';
const config = require('../../config').default;

const TriggerImageUploader = (setFieldsValue: (any) => void, fieldName: string) => {
  const uppy = initUppy();
  uppy.run();
  uppy.on('upload-success', (file, { hash }) => {
    setFieldsValue({[fieldName]: { background: `https://${config.getApiURL()}:443/ipfs/${hash}`}});
    uppy.getPlugin('Dashboard').closeModal();
    uppy.close();
  });
  uppy.getPlugin('Dashboard').openModal();
};

export default TriggerImageUploader;
