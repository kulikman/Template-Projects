import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardMenu } from "@/components/dashboard/card-menu";
import { PROJECTS } from "@/components/dashboard/demo-data";

/** Projects table with coloured status badges. */
export function ProjectsCard(): React.ReactElement {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="mb-4 flex items-baseline justify-between">
          <CardTitle>Projects</CardTitle>
          <CardMenu />
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>#</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assign</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PROJECTS.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.start}</TableCell>
                <TableCell>{project.due}</TableCell>
                <TableCell>
                  <Badge variant={project.variant}>{project.status}</Badge>
                </TableCell>
                <TableCell>{project.assignee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
