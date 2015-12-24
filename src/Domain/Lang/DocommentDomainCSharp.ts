import {TextEditor, Position} from 'vscode';
import {VSCodeApi} from '../../Api/VSCodeApi';
import {StringUtil} from '../../Utility/StringUtil';
import {DocommentDomain} from '../DocommentDomain';
import {CodeType} from '../IDocommentDomain';

export class DocommentDomainCSharp extends DocommentDomain {


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/

    /* @override */
    public IsTriggerDocomment(): boolean {

        // NG: KeyCode is NOT '/' or Enter
        const activeChar: string = this._vsCodeApi.ReadCharAtCurrent();
        if (activeChar == null) return false;
        const isSlashKey: boolean = (activeChar === '/');
        const isEnterKey: boolean = (activeChar === '') && this._event.text.startsWith('\n');
        if (!isSlashKey && !isEnterKey) return false;

        // NG: Line is NOT ///
        const activeLine: string = this._vsCodeApi.ReadLineAtCurrent();
        if (activeLine == null) return false;
        const isDocComment: boolean = (activeLine.match(/([^/]\/{3}$)|(^\/{3})/).length != 0);
        if (!isDocComment) return false;

        // NG: Position is NOT ///
        const position: number = this._vsCodeApi.GetActiveCharPosition();
        const positionDocComment: number = activeLine.lastIndexOf('///') + ((isEnterKey) ? 3 : 2);
        const isLastPosition: boolean = (position === positionDocComment);
        if (!isLastPosition) return false;

        // NG: Previous line is XML document comment
        const previousLine: string = this._vsCodeApi.ReadPreviousLineFromCurrent();
        if (previousLine != null && previousLine.match(/\/{3}/)) return false;

        // OK
        return true;
    }

    /* @override */
    public GetCodeType(code: string): CodeType {

        /* namespace */
        const isNamespace: boolean = code.match(/.*namespace[ \t]/) !== null;
        if (isNamespace) return CodeType.Namespace;

        /* class */
        const isClass: boolean = code.match(/.*class[ \t]/) !== null;
        if (isClass) return CodeType.Class;

        /* interface */
        const isInterface: boolean = code.match(/.*interface[ \t]/) !== null;
        if (isInterface) return CodeType.Interface;

        /* struct */
        const isStruct: boolean = code.match(/.*struct[ \t]/) !== null;
        if (isStruct) return CodeType.Struct;

        /* enum */
        const isEnum: boolean = code.match(/.*enum[ \t]/) !== null;
        if (isEnum) return CodeType.Enum;

        /* delegate */
        const isDelegate: boolean = code.match(/.*delegate[ \t]/) !== null;
        if (isDelegate) return CodeType.Delegate;

        /* event */
        const isEvent: boolean = code.match(/.*event[ \t]/) !== null;
        if (isEvent) return CodeType.Event;

        /* property */
        const isProperty: boolean = code.match(/\w+[^)]?[ \t]*{/) !== null;
        if (isProperty) return CodeType.Property;

        /* field */
        const isField: boolean = code.match(/;[ \t]*$/) !== null;
        if (isField) return CodeType.Field;

        /* method */
        const isMethod: boolean = code.match(/\w[ \t]\w.*\(.*\)/) !== null;
        if (isMethod) return CodeType.Method;

        return CodeType.None;
    }

    /* @override */
    public GeneDocomment(codeType: CodeType, code: string): string {

        let comment: string = "";
        switch (codeType) {
            case CodeType.Namespace:
                comment = `<summary></summary>`;
                break;
            case CodeType.Class:
                comment = `<summary></summary>`;
                break;
            case CodeType.Interface:
                comment = `<summary></summary>`;
                break;
            case CodeType.Struct:
                comment = `<summary></summary>`;
                break;
            case CodeType.Enum:
                comment = `<summary></summary>`;
                break;
            case CodeType.Delegate:
                comment = `<summary></summary>`;
                break;
            case CodeType.Event:
                comment = `<summary></summary>`;
                break;
            case CodeType.Method:
                comment = `<summary></summary>`;
                break;
            case CodeType.Field:
                comment = `<summary></summary>`;
                break;
            case CodeType.Property:
                comment = `<summary></summary>`;
                break;
            default:
                break;
        }

        // TODO: indent
        const indent: string = StringUtil.GetIndent(code);


        return comment;
    }

}
