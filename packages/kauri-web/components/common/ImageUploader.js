// @flow
import initUppy from '../../lib/init-uppy'

const TriggerImageUploader = (setFieldsValue) => {
    setFieldsValue({ background: 'saving background image'});
    const uppy = initUppy();
    uppy.run();
    uppy.on('upload-success', (file, { hash }) => {
      setFieldsValue({ background: 'url.com'});
      uppy.getPlugin('Dashboard').closeModal();
      uppy.close();
    });
    uppy.getPlugin('Dashboard').openModal();
};

export default TriggerImageUploader;