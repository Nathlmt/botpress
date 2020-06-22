import React from 'react'
import { Form, Input, Label, FormGroup } from 'reactstrap'

export class Render extends React.Component {
  state = {
    lessonInput: undefined,
  }
  componentDidMount() {
    this.setStateFromProps()
  }
  setStateFromProps = () => {
    const data = this.props.initialData

    if (data) {
      this.setState({
        lessonInput: data.lessonInput,
      })
    }
  }
  componentDidUpdate() {
    if (this.isFormValid()) {
      this.props.onDataChanged && this.props.onDataChanged(this.state)
      this.props.onValidChanged && this.props.onValidChanged(true)
    }
  }

  isFormValid() {
    return (
      !_.isEmpty(this.state.lessonInput)
    )
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleText">Input Lesson JSON format</Label>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            onChange={event => this.setState({lessonInput: event.target.value})}
            value={this.state.lessonInput}
          />
        </FormGroup>
      </Form>
    )
  }
}
