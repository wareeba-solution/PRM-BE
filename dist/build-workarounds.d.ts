declare global {
    interface Promise<T> {
        __entity_type_workaround?: T;
    }
    interface Object {
        then?: any;
        catch?: any;
        finally?: any;
    }
}
declare const _default: {};
export default _default;
