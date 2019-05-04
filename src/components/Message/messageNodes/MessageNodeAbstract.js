import React, { Component } from 'react'

/**
 * MessageNodeAbstract - абстрактный класс узла
 */
export default class MessageNodeAbstract extends Component{

    /**
     * Метод возвращающий строку, в которой &nbsp; заменено на \u00a0
     * @param string - строка, в которой требуется заменить
     * @returns {string}
     */
    static replaceNbsp(string) {
        const length = string.split("&nbsp;").length;
        let newStr = string;
        for(let i = 0; i < length; ++i){
            newStr = newStr.replace('&nbsp;', '\u00a0');
        }
        return newStr;
    }

    constructor(props){
        super(props);

        this.styles = [];
    }

    /**
     * Абстрактный метод разметки "по-умолчанию". Требует переопредеения в методах классов-потомков.
     */
    markupDefault() {}

    /**
     * Возвращает объект, содержащий настройки стиля для узла
     * @returns {object || null || undefined}
     */
    getStyle() {
        const { style: styleName } = this.props.params;
        if ( this.styles.length <= 0 ) return null;
        return this.styles.find( style => style.name === styleName )
    }

    /**
     * Возвращает разметку отступов для узла в зависимости от того инлайновый узел или нет
     * @returns {*}
     */
    inlineMarkup() {
        return this.props.params.inline ? " " : <br/>
    }

    render() {
        const styleObj = this.getStyle();

        if (!styleObj) {
            return this.markupDefault();
        } else {
            return styleObj.markup()
        }
    }
}
