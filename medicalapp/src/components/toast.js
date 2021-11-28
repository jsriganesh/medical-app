import React from 'react';
import {
    View,
    StyleSheet,
    Button,
    Modal,
    Image,
    Text,
    TouchableOpacity,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import colors from "../utils/colors"
const ModalPoup = ({ visible, children, callBack }) => {
    console.log(visible)
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal} >
            <TouchableWithoutFeedback onPress={() => {
                setShowModal(false)
                callBack(false)
            }}>
                <View style={styles.modalBackGround}>
                    <Animated.View
                        style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                            
                            <Text style={{ color: colors.themeColor, fontWeight: "500", flex: 0.9,marginTop:20 }}>{children}</Text>
                        <TouchableOpacity style={{ flex: 0.1, alignItems: "flex-end" }} onPress={()=>{
                            setShowModal(false)
                            callBack(false)
                        }}>
                            <Image source={require("../../assets/images/close.png")} style={{ height: 20, width: 20,tintColor:colors.themeColor }} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 10,
        borderRadius: 20,
        elevation: 20,
        flexDirection: "row"
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

export default ModalPoup;