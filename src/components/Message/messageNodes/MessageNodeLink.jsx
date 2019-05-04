import React from 'react';
import PropTypes from 'prop-types';
import MessageNodeAbstract from './MessageNodeAbstract'

/**
 * MessageNodeLink - класс-наследник MessageNodeAbstract.
 * Предназначен для рендера кнопок (type: "link")
 */
class MessageNodeLink extends MessageNodeAbstract{

    /**
     * Метод, возвращающий разметку по-умолчанию для узла
     * @returns {JSX-выражение}
     */
    markupDefault() {
        const { params, children } = this.props;
        return (
            <>
                { this.inlineMarkup() }
                <a href={params.url} target="_blank" rel="noopener noreferrer" >
                    {params.content}
                    {children}
                </a>
            </>
        )
    }


}

MessageNodeLink.displayName = 'MessageNodeLink';

MessageNodeLink.defaultProps = {
    children: null,
};

MessageNodeLink.propTypes = {
    params: PropTypes.shape({
        style: PropTypes.string, //Стилевая константа
        content: PropTypes.string.isRequired, //Контент
        inline: PropTypes.bool.isRequired, //Инлайн-флаг
        url: PropTypes.string.isRequired //Url ссылки
    }),
    children: PropTypes.array //Массив потомков
};

export default MessageNodeLink;
