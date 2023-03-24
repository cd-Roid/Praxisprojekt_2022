import ast
import json

def generate_code(ast_json):
    node_type = ast_json.get('type')

    if node_type == 'Module':
        body = ast_json.get('body')
        return ast.Module(body=[generate_code(node) for node in body])
    elif node_type == 'If':
        test = generate_code(ast_json.get('test'))
        body = ast_json.get('body')
        orelse = ast_json.get('orelse')
        return ast.If(test=test, body=[generate_code(node) for node in body], orelse=[generate_code(node) for node in orelse])
    elif node_type == 'Compare':
        left = generate_code(ast_json.get('left'))
        ops = [generate_code(op) for op in ast_json.get('ops')]
        comparators = [generate_code(comparator) for comparator in ast_json.get('comparators')]
        return ast.Compare(left=left, ops=ops, comparators=comparators)
    elif node_type == 'Name':
        return ast.Name(id=ast_json.get('id'), ctx=generate_code(ast_json.get('ctx')))
    elif node_type == 'Load':
        return ast.Load()
    elif node_type == 'Eq':
        return ast.Eq()
    elif node_type == 'Str':
        return ast.Str(s=ast_json.get('s'))
    elif node_type == 'Expr':
        value = generate_code(ast_json.get('value'))
        return ast.Expr(value=value)
    elif node_type == 'Call':
        func = generate_code(ast_json.get('func'))
        args = [generate_code(arg) for arg in ast_json.get('args')]
        keywords = [generate_code(keyword) for keyword in ast_json.get('keywords')]
        return ast.Call(func=func, args=args, keywords=keywords)
    elif node_type == 'Attribute':
        value = generate_code(ast_json.get('value'))
        attr = ast_json.get('attr')
        ctx = generate_code(ast_json.get('ctx'))
        return ast.Attribute(value=value, attr=attr, ctx=ctx)
    else:
        raise ValueError(f'Unknown AST node type: {node_type}')
        
#print(ast.dump(generate_code(sys.argv[1])))

#ast_node = generate_code(json.loads(sys.argv[1]))
sys.stdout.write(sys.argv[1])
