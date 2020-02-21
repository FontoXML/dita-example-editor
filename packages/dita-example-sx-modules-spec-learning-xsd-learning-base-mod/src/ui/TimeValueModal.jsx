import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
	Button,
	Form,
	FormRow,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput
} from 'fds/components';

class TimeValueModal extends Component {
	static propTypes = {
		cancelModal: PropTypes.func.isRequired,
		data: PropTypes.shape({
			modalPrimaryButtonLabel: PropTypes.string,
			timeValue: PropTypes.string
		}),
		submitModal: PropTypes.func.isRequired
	};

	textInputRef = null;

	state = {
		timeValue: this.props.data.timeValue || ''
	};

	handlePrimaryButtonClick = () =>
		this.props.submitModal({
			timeValue: this.state.timeValue
		});

	handleKeyDown = event => {
		switch (event.key) {
			case 'Escape':
				this.props.cancelModal();
				break;
			case 'Enter':
				if (this.state.timeValue !== '') {
					this.handlePrimaryButtonClick();
				}
				break;
		}
	};

	handleTextInputChange = value =>
		this.setState({
			timeValue: value
		});

	handleTextInputRef = textInputRef => (this.textInputRef = textInputRef);

	render() {
		return (
			<Modal size="s" onKeyDown={this.handleKeyDown}>
				<ModalHeader icon="clock-o" title="Enter the time duration" />

				<ModalBody>
					<Form labelPosition="before">
						<FormRow label="Duration">
							<TextInput
								onChange={this.handleTextInputChange}
								ref={this.handleTextInputRef}
								value={this.state.timeValue}
							/>
						</FormRow>
					</Form>
				</ModalBody>

				<ModalFooter>
					<Button label="Cancel" onClick={this.props.cancelModal} />

					<Button
						type="primary"
						label={this.props.data.modalPrimaryButtonLabel || 'Insert'}
						isDisabled={this.state.timeValue === ''}
						onClick={this.handlePrimaryButtonClick}
					/>
				</ModalFooter>
			</Modal>
		);
	}

	componentDidMount() {
		this.textInputRef.focus();
	}
}

export default TimeValueModal;
