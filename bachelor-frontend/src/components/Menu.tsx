import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'

import RentalOverview from '../pages/RentalOverview'
import Houses from '../pages/Houses'
import Customers from '../pages/Customers'
import Materials from '../pages/Materials'
import Production from '../pages/Production'

export default class MenuExamplePointing extends Component {
  state = { 
      activeItem: 'rental overview'
  }

  handleItemClick = (e: any, { name }: any) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing>

          <Menu.Item
            name='rental overview'
            active={activeItem === 'rental overview'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='houses'
            active={activeItem === 'houses'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='customers'
            active={activeItem === 'customers'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='materials'
            active={activeItem === 'materials'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='production'
            active={activeItem === 'production'}
            onClick={this.handleItemClick}
          />

            <Menu.Item position='right'>
              <Input icon='search' placeholder='Search' />
            </Menu.Item>

        </Menu>

        <Segment content={'This part of the menu will show the ' + this.state.activeItem}>

          <Production />
            
        </Segment>

      </div>
    )
  }
}