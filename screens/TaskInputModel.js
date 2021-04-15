import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Keyboard,
  Button,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import COLORS from '../config/COLORS.js';
const TaskInputModel = ({visible, onClose, onSubmit}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleModalClose = () => {
    //   to close the keyboard when clicked outside
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'date') setDate(text);
    if (valueFor === 'description') setDescription(text);
  };
  const handleSubmit = () => {
    if (!title.trim() && !date.trim() && !description.trim()) {
      return onClose();
    }
    onSubmit(title, date, description);
    setTitle('');
    setDate('');
    setDescription('');
    onClose();
  };

  const closeModal = () => {
    setTitle('');
    setDate('');
    setDescription('');
    onClose();
  };
  return (
    <>
      {/* <StatusBar hidden /> */}
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            placeholder="Title"
            style={[styles.input, styles.title]}
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
          />
          <TextInput
            placeholder="Date"
            value={date}
            style={[styles.input, styles.date]}
            onChangeText={text => handleOnChangeText(text, 'date')}
          />
          <TextInput
            placeholder="Description"
            multiline
            value={description}
            onChangeText={text => handleOnChangeText(text, 'description')}
            style={[styles.input, styles.description]}
          />
          <View style={styles.btnContainer}>
            <Button
              style={{marginRight: 15}}
              title="Add"
              onPress={handleSubmit}
            />
            {title.trim() || date.trim() || description.trim() ? (
              <Button
                style={{marginLeft: 15}}
                title="Close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        {/* Close keyboard when clicked on empty space */}
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default TaskInputModel;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20, paddingTop: 15},
  input: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.PRIMARY,
    color: COLORS.DARK,
  },
  title: {height: 40, marginBottom: 50, fontWeight: 'bold'},
  date: {height: 40, marginBottom: 50, fontWeight: 'bold'},
  description: {height: 100},
  //   use absolute fill object to fill in the whole screen
  modalBG: {flex: 1, zIndex: -1},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
});
