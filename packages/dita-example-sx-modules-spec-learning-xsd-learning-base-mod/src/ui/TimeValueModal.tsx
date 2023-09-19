import type { ReactElement } from 'react';
import { Component } from 'react';

import {
	Button,
	Form,
	FormRow,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextInput,
} from 'fontoxml-design-system/src/components';

class TimeValueModal extends Component<{
	cancelModal(): void;
	data: {
		modalPrimaryButtonLabel: string;
		timeValue: string;
	};
	submitModal({ timeValue: string }): void;
}> {
	private textInputRef = null;

	public state = {
		timeValue: this.props.data.timeValue || '',
	};

	private readonly handlePrimaryButtonClick = () => {
		this.props.submitModal({
			timeValue: this.state.timeValue,
		});
	};

	private readonly handleKeyDown = (event) => {
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

	private readonly handleTextInputChange = (value) => {
		this.setState({
			timeValue: value,
		});
	};

	private readonly handleTextInputRef = (textInputRef) =>
		(this.textInputRef = textInputRef);

	public render(): ReactElement {
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
						label={
							this.props.data.modalPrimaryButtonLabel || 'Insert'
						}
						isDisabled={this.state.timeValue === ''}
						onClick={this.handlePrimaryButtonClick}
					/>
				</ModalFooter>
			</Modal>
		);
	}

	public componentDidMount(): void {
		this.textInputRef.focus();
	}
}

export default TimeValueModal;
