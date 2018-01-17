import './styles.css'
import Inferno from 'inferno' // eslint-disable-line
import Component from 'inferno-component' // eslint-disable-line
import classNames from 'classnames'
import {connect} from '@cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import signalsList from '../../../common/computed/signalsList'

export default connect({
  type: state`config.type`,
  currentPage: state`currentPage`,
  searchValue: state`searchValue`,
  searchComponentValue: state`searchComponentValue`,
  isSmall: state`useragent.media.small`,
  appSignals: signalsList,
  pageChanged: signal`pageChanged`,
  searchValueChanged: signal`searchValueChanged`,
  searchComponentValueChanged: signal`searchComponentValueChanged`
},
  class Toolbar extends Component {
    constructor (props) {
      super(props)
      this.state = {
        copiedSignals: null
      }
    }
    render () {
      return (
        <ul className='toolbar'>
          <li className='toolbar-item'>
            <ul className='toolbar-tabs'>
              <li
                className={classNames('toolbar-tab', {'toolbar-tab--active': this.props.currentPage === 'signals'})}
                onClick={() => this.props.pageChanged({page: 'signals'})}>
                <i className='icon icon-signals' /> {this.props.type === 'c' || this.props.type === 'cft' ? 'SIGNALS' : 'EXECUTION'}
              </li>
              {
                this.props.type === 'c' || this.props.type === 'cft' ? [
                  <li
                    className={classNames('toolbar-tab', {'toolbar-tab--active': this.props.currentPage === 'model'})}
                    onClick={() => this.props.pageChanged({page: 'model'})}>
                    <i className='icon icon-model' /> STATE-TREE
                  </li>,
                  <li
                    className={classNames('toolbar-tab', {'toolbar-tab--active': this.props.currentPage === 'mutations'})}
                    onClick={() => this.props.pageChanged({page: 'mutations'})}>
                    <i className='icon icon-mutation' /> MUTATIONS
                  </li>,
                  <li
                    className={classNames('toolbar-tab', {'toolbar-tab--active': this.props.currentPage === 'components'})}
                    onClick={() => this.props.pageChanged({page: 'components'})}>
                    <i className='icon icon-components' /> COMPONENTS
                  </li>,
                  <li className='toolbar-search'>
                    <input
                      type='text'
                      placeholder='Search path...'
                      value={this.props.searchValue}
                      onInput={(event) => this.props.searchValueChanged({value: event.target.value})} />
                  </li>,
                  this.props.currentPage === "components" ?
                    <li className='toolbar-search'>
                      <input
                        type='text'
                        placeholder='Search component...'
                        value={this.props.searchComponentValue}
                        onInput={(event) => this.props.searchComponentValueChanged({value: event.target.value})} />
                    </li> :
                    null
                ] : null
              }
            </ul>
          </li>
        </ul>
      )
    }
  }
)
