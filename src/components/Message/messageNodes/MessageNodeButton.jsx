import React from 'react';
import PropTypes from 'prop-types';
import MessageNodeAbstract from './MessageNodeAbstract'

const ACTIONS = {
    GO_ORDER: 'go_order',
    PLACE_NEW_ORDER: 'place_new_order'
};

const ROOT = {
    URL: 'https://allput.ru'
};

/**
 * MessageNodeButton - класс-наследник MessageNodeAbstract.
 * Предназначен для рендера кнопок (type: "button")
 */
class MessageNodeButton extends MessageNodeAbstract{

    constructor(props) {
        super(props);

        this.styles = [
            {
                name: 'border_button',
                markup: this.markupBorderButton.bind(this)
            },
            {
                name: 'no_border_button',
                markup: this.markupNoBorderButton.bind(this)
            }
        ];

        this.href = {
            root: ROOT.URL,
            actionUrl: this.generateActionUrl()
        };

        this.generatedHref = this.href.actionUrl ? `${this.href.root}${this.href.actionUrl}` : '#';
    }

    /**
     *  Метод, возвращающий разметку по-умолчанию для узла
     * @returns {JSX-выражение}
     */
    markupDefault() {
        const { children, params } = this.props;
        const href = this.generatedHref;

        return (
            <>
                { this.inlineMarkup() }
                <a href={href}>
                    {params.content}
                    { children }
                </a>
            </>
        )
    }

    /**
     * Метод, возвращающий разметку для узла
     * @returns {JSX-выражение}
     */
    markupBorderButton() {
        const { children, params } = this.props;
        const href = this.generatedHref;

        return (
            <>
                { this.inlineMarkup() }
                <a href={href} target='_blank' rel="noopener noreferrer" className="btn btn-small-size btn-blue-no-fill" >
                    {params.content}
                    {children}
                </a>
            </>
        )
    }

    /**
     * Метод, возвращающий разметку для узла
     * @returns {JSX-выражение}
     */
    markupNoBorderButton() {
        const { children, params } = this.props;
        const href = this.generatedHref;

        return (
            <>
                { this.inlineMarkup() }
                <a href={href} target='_blank' rel="noopener noreferrer" className="btn btn-small-size btn-link" >
                    {params.content}
                    {children}
                </a>
            </>
        )
    }

    /**
     * генерация url в соответствии с action
     * @returns {string || null}
     */
    generateActionUrl() {
        const { action, id } = this.props.params;

        switch (action) {
            case ACTIONS.GO_ORDER:
                return `/cabinet/order/${id}`;
            case ACTIONS.PLACE_NEW_ORDER:
                return `/cabinet/addorder-step-1`;
            default:
                return null;
        }
    }

}

MessageNodeButton.displayName = 'MessageNodeButton';

MessageNodeButton.defaultProps = {
    children: null,
};

MessageNodeButton.propTypes = {
    params: PropTypes.shape({ // Параметры узла
        style: PropTypes.string.isRequired, //Стилевая константа
        content: PropTypes.string.isRequired, //Контент
        inline: PropTypes.bool.isRequired, //Инлайн-флаг
        action: PropTypes.string.isRequired, //Константа действия
        id: PropTypes.number //Id сущности для выполнения action
    }),
    children: PropTypes.array //Массив потомков
};

export default MessageNodeButton;
