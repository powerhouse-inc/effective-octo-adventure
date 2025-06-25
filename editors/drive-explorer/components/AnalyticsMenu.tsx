import { Button } from "@powerhousedao/design-system";
import { Icon } from "@powerhousedao/design-system";
import { useState } from "react";
import {
  DateTimePicker,
  Checkbox,
  Input,
} from "@powerhousedao/document-engineering";

export interface AnalyticsMenuProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  logAnalytics: {
    diff: boolean;
    drive: boolean;
    diffStatusMap: boolean;
    driveStatusMap: boolean;
    nodeStatusMap: boolean;
  };
  onLogAnalyticsChange: (logAnalytics: {
    diff: boolean;
    drive: boolean;
    diffStatusMap: boolean;
    driveStatusMap: boolean;
    nodeStatusMap: boolean;
  }) => void;
  onDeleteNode: (nodeId: string) => void;
}

export const AnalyticsMenu = (props: AnalyticsMenuProps) => {
  const {
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    logAnalytics,
    onLogAnalyticsChange,
    onDeleteNode,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [nodeId, setNodeId] = useState("");

  const handleDeleteNode = () => {
    if (nodeId) {
      onDeleteNode(nodeId);
      setNodeId("");
    }
  };

  const closeContent = () => (
    <Button size="small" color="dark" onClick={() => setIsOpen(true)}>
      Analytics
      <Icon name="Tube" size={14} />
    </Button>
  );

  const openContent = () => (
    <div className="flex flex-col gap-2 bg-white shadow-lg rounded-lg p-2">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>
          <Icon name="XmarkLight" size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <DateTimePicker
          name="startDate"
          label="Start Date:"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
        <DateTimePicker
          name="endDate"
          label="End Date:"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
        <Checkbox
          value={logAnalytics.diff}
          onChange={(val: boolean) =>
            onLogAnalyticsChange({ ...logAnalytics, diff: val })
          }
          label="Log diff analytics"
        />
        <Checkbox
          value={logAnalytics.drive}
          onChange={(val: boolean) =>
            onLogAnalyticsChange({ ...logAnalytics, drive: val })
          }
          label="Log drive analytics"
        />
        <Checkbox
          value={logAnalytics.diffStatusMap}
          onChange={(val: boolean) =>
            onLogAnalyticsChange({ ...logAnalytics, diffStatusMap: val })
          }
          label="Log diff status map"
        />
        <Checkbox
          value={logAnalytics.driveStatusMap}
          onChange={(val: boolean) =>
            onLogAnalyticsChange({ ...logAnalytics, driveStatusMap: val })
          }
          label="Log drive status map"
        />
        <Checkbox
          value={logAnalytics.nodeStatusMap}
          onChange={(val: boolean) =>
            onLogAnalyticsChange({ ...logAnalytics, nodeStatusMap: val })
          }
          label="Log node status map"
        />
        <div className="mt-3">
          <span className="text-sm font-bold">Delete node:</span>
          <div className="flex gap-2">
            <Input
              placeholder="Node id"
              value={nodeId}
              onChange={(e) => setNodeId(e.target.value)}
            />
            <Button
              size="small"
              className="bg-red-600 hover:bg-red-800"
              onClick={handleDeleteNode}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const content = isOpen ? openContent() : closeContent();

  return <div className="fixed bottom-2 right-2">{content}</div>;
};
