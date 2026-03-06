/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 400, y: 10 }, data: { label: 'Leadership' } },
    { id: '2', position: { x: 600, y: 100 }, data: { label: 'Advisory Council' } },
    { id: '3', position: { x: 400, y: 100 }, data: { label: 'Secretariat General' } },
    { id: '5', position: { x: 100, y: 200 }, data: { label: 'Legal Affairs, Cooperation, and Public Relations Bureau' } },
    { id: '4', position: { x: 300, y: 200 }, data: { label: 'General and Human Resources Bureau' } },
    { id: '6', position: { x: 500, y: 200 }, data: { label: 'Application Review Bureau' } },
    { id: '7', position: { x: 700, y: 200 }, data: { label: 'Witness and Victim Rights Fulfillment Bureau' } },
    { id: '8', position: { x: 10, y: 350 }, data: { label: 'Oversight Division' } },
    { id: '9', position: { x: 400, y: 350 }, data: { label: 'LPSK Regional Representatives' } },
    { id: '10', position: { x: 600, y: 350 }, data: { label: 'Expert Staff' } },

];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e3-5', source: '3', target: '5' },
    { id: 'e3-6', source: '3', target: '6' },
    { id: 'e3-7', source: '3', target: '7' },
    { id: 'e2-8', source: '3', target: '8' },
    { id: 'e3-9', source: '3', target: '9' },
    { id: 'e5-8', source: '5', target: '8', animated: true },
    { id: 'e1-10', source: '1', target: '10' },
    { id: 'e3-10', source: '3', target: '10' },
];

export default function EnFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div className="h-[80vh] border rounded overflow-hidden">
            <ReactFlow
                className="w-full h-full"
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
}
