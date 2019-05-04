import React from 'react';
import PropTypes from 'prop-types';
import MessageNodeAbstract from './MessageNodeAbstract'

/**
 * MessageNodeParagraph - класс-наследник MessageNodeAbstract.
 * Предназначен для рендера кнопок (type: "paragraph")
 */
class MessageNodeParagraph extends MessageNodeAbstract{

    /**
     * Метод, возвращающий разметку по-умолчанию для узла
     * @returns {JSX-выражение}
     */
    markupDefault() {
        const { children } = this.props;
        return (
            <p>
                { children }
            </p>
        )
    }

}

MessageNodeParagraph.displayName = 'MessageNodeParagraph';

MessageNodeParagraph.defaultProps = {
    params: null,
    children: null
};

MessageNodeParagraph.propTypes = {
    params: PropTypes.object, // Параметры узла
    children: PropTypes.array //Массив потомков
};

export default MessageNodeParagraph;
