import React, { useCallback, useState } from 'react';

import PropTypes from 'prop-types';

import {
	Button,
	Form,
	FormRow,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	TextInput
} from 'fds/components';

import t from 'fontoxml-localization/src/t.js';

function OtherpropsModal({ cancelModal, data, submitModal }) {
	const [valueByName, setValueByName] = useState({ value: data.value });

	const handleKeyDown = event => {
		switch (event.key) {
			case 'Escape':
				cancelModal();
				break;

			case 'Enter':
				submitModal(valueByName);
				break;
		}
	};

	const handleFormChange = useCallback(
		({ feedbackByName: _feedbackByName, valueByName }) => setValueByName(valueByName),
		[]
	);

	const handleSubmitButtonClick = useCallback(() => submitModal(valueByName), [
		submitModal,
		valueByName
	]);

	return (
		<Modal onKeyDown={handleKeyDown} size="s">
			<ModalHeader icon="medal" title={t('Specify a value for "otherprops"')} />

			<ModalBody>
				<ModalContent paddingSize="m">
					<Form
						labelPosition="before"
						onChange={handleFormChange}
						valueByName={valueByName}
					>
						<FormRow label="Otherprops">
							<TextInput name="value" />
						</FormRow>
					</Form>
				</ModalContent>
			</ModalBody>

			<ModalFooter>
				<Button onClick={cancelModal} label={t('Cancel')} />

				<Button onClick={handleSubmitButtonClick} label={t('Save')} type="primary" />
			</ModalFooter>
		</Modal>
	);
}
OtherpropsModal.propTypes = {
	cancelModal: PropTypes.func.isRequired,
	data: PropTypes.shape({
		value: PropTypes.string
	}),
	submitModal: PropTypes.func.isRequired
};

export default OtherpropsModal;
