import ImagePicker from 'react-native-image-crop-picker';
import { primaryColor } from '../../../themes/colors';

export const Picker = {
    userGallery: async () => {
        let img = await ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            cropperActiveWidgetColor: primaryColor,
            cropperToolbarColor: primaryColor,
        });
        return img.path;
    },
    userCamera: async () => {
        let img = await ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
            cropperActiveWidgetColor: primaryColor,
            cropperToolbarColor: primaryColor,
        });
        return img.path;
    },
    clean: async () => {
        try {
            await ImagePicker.clean();
            console.log('Removed all temporary image picker files');
        } catch (error) {
            console.log(error);
        }
    },
};
