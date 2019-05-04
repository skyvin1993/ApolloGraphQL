import React from 'react';
import MessageNodeAbstract from './MessageNodeAbstract'
import PropTypes from 'prop-types';

/**
 * MessageNodeText - класс-наследник MessageNodeAbstract.
 * Предназначен для рендера кнопок (type: "text")
 */
class MessageNodeText extends MessageNodeAbstract{
    constructor(props) {
        super(props);

        this.styles = [
            {
                name: 'normal',
                markup: this.markupDefault.bind(this)
            },
            {
                name: 'bold',
                markup: this.markupBold.bind(this)
            },
            {
                name: 'order_data',
                markup: this.markupOrderData.bind(this)
            },
            {
                name: 'review_neutral',
                markup: this.markupReviewNeutral.bind(this)
            },
            {
                name: 'review_positive',
                markup: this.markupReviewPositive.bind(this)
            },
            {
                name: 'review_negative',
                markup: this.markupReviewNegative.bind(this)
            }
        ];
    }

    /**
     * Метод, возвращающий разметку по-умолчанию для узла
     * @returns {JSX-выражение}
     */
    markupDefault() {
        const { children, params } = this.props;

        return (
            <>
                { this.inlineMarkup() }
                <span>
                    { params.content }
                    { children }
                </span>
            </>
        )
    }

    /**
     * Метод, возвращающий разметку для узла
     * @returns {JSX-выражение}
     */
     markupBold() {
         const { children, params } = this.props;

         return (
            <>
                { this.inlineMarkup() }
                <b>
                    {params.content}
                    {children}
                </b>
            </>
        )
    }

    /**
     * Метод, возвращающий разметку для узла
     * @returns {JSX-выражение}
     */
     markupOrderData() {
        const { children, params } = this.props;

        return (
            <>
                { this.inlineMarkup() }
                <span className="text-size-12 gray">
                    { MessageNodeText.replaceNbsp(params.content) }
                    { children }
                </span>
            </>
        )
    }

    /**
     * Метод, возвращающий разметку для узла
     * @returns {JSX-выражение}
     */
     markupReviewNeutral() {
         const { children, params } = this.props;

         return (
            <>
                { this.inlineMarkup() }
                <span className="gray">
                    { params.content }
                    { children }
                </span>
            </>
        )
    }

    /**
     * Метод, возвращающий разметку для узла
     * @returns {JSX-выражение}
     */
     markupReviewPositive() {
         const { children, params } = this.props;

         return (
            <>
                { this.inlineMarkup() }
                <span className="green">
                    { params.content }
                    { children }
                </span>
            </>
        )
    }

    /**
     * Метод, возвращающий разметку для узла
     * @returns {JSX-выражение}
     */
     markupReviewNegative() {
         const { children, params } = this.props;

         return (
            <>
                { this.inlineMarkup() }
                <span className="red">
                    { params.content }
                    { children }
                </span>
            </>
        )
    }

}

MessageNodeText.displayName = 'MessageNodeText';

MessageNodeText.defaultProps = {
    children: null
};

MessageNodeText.propTypes = {
    params: PropTypes.shape({ // Параметры узла
        style: PropTypes.string.isRequired, //Стилевая константа
        content: PropTypes.string.isRequired, //Контент
        inline: PropTypes.bool.isRequired //Инлайн-флаг
    }),
    children: PropTypes.array //Массив потомков
};

export default MessageNodeText;
