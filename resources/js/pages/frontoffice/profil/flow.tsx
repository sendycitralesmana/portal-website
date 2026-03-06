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
    { id: '1', position: { x: 400, y: 10 }, data: { label: 'Pimpinan' } },
    { id: '2', position: { x: 600, y: 100 }, data: { label: 'Dewan Penasihat' } },
    { id: '3', position: { x: 400, y: 100 }, data: { label: 'Sekretariat Jendral' } },
    { id: '5', position: { x: 100, y: 200 }, data: { label: 'Biro Hukum, Kerjasama, dan Hubungan Masyarakat' } },
    { id: '4', position: { x: 300, y: 200 }, data: { label: 'Biro Umum dan Kepegawaian' } },
    { id: '6', position: { x: 500, y: 200 }, data: { label: 'Biro Penelaahan Permohonan' } },
    { id: '7', position: { x: 700, y: 200 }, data: { label: 'Biro Pemenuhan Hak Saksi dan Korban' } },
    { id: '8', position: { x: 10, y: 350 }, data: { label: 'Bagian Pengawasan' } },
    { id: '9', position: { x: 400, y: 350 }, data: { label: 'Perwakilan LPSK' } },
    { id: '10', position: { x: 600, y: 350 }, data: { label: 'Tenaga Ahli' } },
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

export default function Flow() {
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
