import { Component } from 'react'

/**
 *
 * Placeholder for OverlayContainer
 *
 */
interface OverlayContainerProps {
  render: (arg: OverlayContainer) => JSX.Element
}

class OverlayContainer extends Component<OverlayContainerProps> {
  render() {
    return this.props.render(this)
  }
}

export default OverlayContainer
