/**
 * 遍历树节点
 */
export function foreachTree<T>(tree: T, childrenName = 'children', predicate: (node: T) => {}): void {
    predicate(tree);
    let children = (tree as any)[childrenName] as T[]
    if (children && children.length > 0) {
        children.forEach((node) => {
            foreachTree(node, childrenName, predicate);
        })
    }
}


export default {}