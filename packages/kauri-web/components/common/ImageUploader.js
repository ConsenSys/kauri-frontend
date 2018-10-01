// @flow
import initUppy from '../../lib/init-uppy';
const config = require('../../config').default;

const TriggerImageUploader = (setFieldsValue: { [string] : string} => void, fieldName: string, callback: any) => {
  const uppy = initUppy();
  uppy.run();
  uppy.on('upload-success', (file, { hash }) => {
    if (setFieldsValue) setFieldsValue({[fieldName]: { background: `https://${config.getApiURL()}:443/ipfs/${hash}` }});
    if (callback) callback(file, `https://${config.getApiURL()}:443/ipfs/${hash}`)
    uppy.getPlugin('Dashboard').closeModal();
    uppy.close();
  });
  uppy.getPlugin('Dashboard').openModal();
};

export default TriggerImageUploader;
