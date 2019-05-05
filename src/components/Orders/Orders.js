import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer, Mutation  } from 'react-apollo';
import { ORDERS } from '../../Queries';
import { ADD_FAVOR, REMOVE_FAVOR } from '../../Mutations';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';

/**
 * Orders - компонент загрузки и рендера заказов.
 * По-умолчанию грузит завершенные заказы (category === "complete")
 */
export default class Orders extends Component{
    constructor(props){
        super(props);

        this.state = {
            isOrdersFeched: false,
            orders: []
        }
    }

    /**
     * Асинхронный метод инициирующий мутацию при добавлении или удалении из избранного 
     * @param {function} doMutation асинхронная функция запускающая мутацию
     * @param {number} orderID ID заказа для идентификации при выполнении мутации
     * @param {number} key Индекс заказа в this.state.orders массиве
     * @param {object} event Объект события, инициирущего вызов метода  
     */
    async onFavor({ doMutation, orderID, key, event }) {
        event.preventDefault();
        await doMutation({ variables: { orderID } });
        let newOrders = [...this.state.orders];
        newOrders[key] = {
            ...newOrders[key],
            favorite: !newOrders[key].favorite
        }
        this.setState({ orders: newOrders })    
    }

    /**
     * Метод рендера кнопки добавления в избранное
     * @param {number} orderID ID заказа для идентификации при выполнении мутации
     * @param {number} key Индекс заказа в this.state.orders массиве
     */
    renderAddFavor({orderID, key}) {
        return (
            <Mutation mutation={ADD_FAVOR}>
                {doMutation => (
                    <button className="btn btn-link mb-0" onClick={ event => {
                         this.onFavor({ event, orderID, key, doMutation }) 
                    }} >В избранное</button>            
                )}
            </Mutation>
        )
    }

    /**
     * Метод рендера иконки избранного. По клику осуществляет удаление заказа из избранного
     * @param {number} orderID ID заказа для идентификации при выполнении мутации
     * @param {number} key Индекс заказа в this.state.orders массиве
     */
    renderFavorIcon({ orderID, key }) {
        return (
            <Mutation mutation={REMOVE_FAVOR}>
                {doMutation => (
                    <span className="favourite-icon" onClick={ event => {
                        this.onFavor({ event, orderID, key, doMutation })
                    }} ><FontAwesomeIcon icon={['fa', 'star']} /></span>
                )}
            </Mutation>
        )
    }

    /**
     * Метод рендера заказов
     */
    renderOrders() {
        return (
          <ul className="list-group">
            {this.state.orders.map((order, key) => (
              <li key={key} className="list-group-item">
                <div className="row">
                  <div className="col-5 align-self-center">
                    <p>
                        {
                            order.favorite
                            ? this.renderFavorIcon({ orderID: order.id, key })
                            : null
                        }
                        <span className="ml-2" >#{order.id}</span>
                    </p>
                    {
                            !order.favorite
                            ? this.renderAddFavor({ orderID: order.id, key })
                            : null
                    }
                    <div
                      className="status mt-2"
                      style={{ backgroundColor: order.status_color }}
                    >
                      {order.status}
                    </div>
                  </div>
                  <div className="col-7 align-self-center">
                    <h5>{order.name}</h5>
                    <p>{order.subject}</p>
                  </div>
                </div>
                <div className="card mt-2">
                  <div className="card-header">
                    <a
                      href={"#collapseExample" + key}
                      className="mb-0"
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls={"collapseExample" + key}
                    >
                      Customer info
                    </a>
                  </div>
                  <div
                    className="collapse"
                    id={"collapseExample" + key}
                  >
                    <div className="card card-body">
                      <div className="customer-info">
                        <div className="customer-info__ava-block">
                            <img className="customer-info__ava-img" alt="ava" src={order.customer.small_avatar}></img>
                        </div>
                        <div className="customer-info__text ml-3">
                            <p>#{order.customer.id}</p>
                            <h6 className="mb-0">{order.customer.login}</h6>
                        </div>
                        <div className="customer-info__text ml-3">
                            <p className="customer-info__date">Register date: {order.customer.date_registration}</p>
                            <p className="customer-info__date">Last visit date: {order.customer.date_last_visit}</p>
                        </div>
                        <div className="customer-info__text ml-3">
                            <a href={order.customer.profile_link} target="_blank" rel="noopener noreferrer" >Profile</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        );
    }

    render(){
        const { category } = this.props;
        return (
            <ApolloConsumer>
                { client => (
                    <div className="Orders">
                        <h4>Orders</h4>
                        { this.state.isOrdersFeched
                             ? this.renderOrders()
                             : <button className="btn btn-secondary btn-block" onClick={async () => {
                                 const { data } = await client.query({
                                     query: ORDERS,
                                     variables: { category }
                                 })

                                 this.setState({
                                     orders: data.orders.list,
                                     isOrdersFeched: true
                                 })
                             }} >Fetch Orders</button> } 
                    </div>
                )}
            </ApolloConsumer>
        )
    }
}

Orders.defaultProps = {
    category: "complete"
}

Orders.propTypes = {
    category: PropTypes.string // категория заказа (
      // active - Активные,
      // prices - Предложенные цены,
      // past - Прошедшие,
      // execution - На выполнении,
      // complete - Готовые,
      // favorit - Избранные)
}