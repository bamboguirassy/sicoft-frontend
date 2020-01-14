export class AccessModel {
    tableName: string;
    tableCode: string;
    isCreateAllowed : boolean;
    isEditAllowed : boolean;
    isIndexAllowed : boolean;
    isShowAllowed : boolean;
    isCloneAllowed : boolean;
    isDeleteAllowed : boolean;
    //local attributes
    checkAll: boolean;
}