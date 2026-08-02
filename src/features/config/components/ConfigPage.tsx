import { useState, useEffect } from "react";
import { DataViewLayout } from "../../../components/layout/DataViewLayout";
import { Flex } from "../../../components/layout/flex";
import { Text } from "../../../components/common/text";
import { Button, IconButton } from "../../../components/common/button";
import { Plus, Edit, Eye, Trash2, RefreshCw } from "lucide-react";
import { CreateConfigModal } from "./CreateConfigModal";
import { UpdateConfigModal } from "./UpdateConfigModal";
import { DetailConfigModal } from "./DetailConfigModal";
import { type ConfigFormValues } from "./ConfigForm";
import { DataTable } from "../../../components/data/data-table/DataTable";
import type { DataTableColumn } from "../../../components/data/data-table/types";
import toast from "react-hot-toast";
import { configApi, type ApiConfigData } from "../api/configApi";

export function ConfigPage() {
  const [configs, setConfigs] = useState<ApiConfigData[]>([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<ApiConfigData | null>(null);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const data = await configApi.getAll();
      setConfigs(data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách cấu hình!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const openUpdate = (config: ApiConfigData) => {
    setSelectedConfig(config);
    setUpdateOpen(true);
  };

  const openDetail = (config: ApiConfigData) => {
    setSelectedConfig(config);
    setDetailOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa cấu hình này? Hành động này không thể hoàn tác.")) {
      try {
        await configApi.delete(id);
        toast.success("Đã xóa cấu hình!");
        fetchConfigs();
      } catch (error) {
        toast.error("Lỗi khi xóa cấu hình!");
      }
    }
  };

  const getFormValues = (data: ApiConfigData | null): ConfigFormValues | null => {
    if (!data) return null;
    return {
      id: data.id,
      name: data.name,
      baseUrl: data.baseUrl,
      config: data.config ? JSON.stringify(data.config, null, 2) : "",
    };
  };

  const columns: DataTableColumn<ApiConfigData>[] = [
    {
      header: "Tên cấu hình",
      value: "name",
      render: (row) => <Text variant="smallSemibold">{row.name}</Text>,
    },
    {
      header: "Base URL",
      value: "baseUrl",
    },
    {
      header: "Cập nhật lúc",
      value: "updatedAt",
      render: (row) => <span>{new Date(row.updatedAt).toLocaleString("vi-VN")}</span>,
    },
    {
      header: "Thao tác",
      value: "id",
      align: "right",
      render: (row) => (
        <Flex gap={8} justify="flex-end">
          <IconButton 
            variant="ghost" 
            icon={<Eye size={16} />} 
            onClick={() => openDetail(row)}
            aria-label="Chi tiết"
          />
          <IconButton 
            variant="ghost" 
            icon={<Edit size={16} />} 
            onClick={() => openUpdate(row)}
            aria-label="Sửa"
          />
          <IconButton 
            variant="ghost" 
            icon={<Trash2 size={16} color="#ef4444" />} 
            onClick={() => handleDelete(row.id)}
            aria-label="Xóa"
          />
        </Flex>
      )
    }
  ];

  return (
    <>
      <DataViewLayout
        title="Quản lý Cấu hình"
        subtitle="Thiết lập và lưu trữ các cấu hình môi trường API, Header bảo mật, Token để tái sử dụng."
        toolbar={
          <Flex gap={12}>
            <Button 
              variant="ghost" 
              leftIcon={<RefreshCw size={18} />} 
              onClick={fetchConfigs}
              disabled={loading}
            >
              Làm mới
            </Button>
            <Button 
              variant="primary" 
              leftIcon={<Plus size={18} />} 
              onClick={() => setCreateOpen(true)}
            >
              Thêm cấu hình
            </Button>
          </Flex>
        }
        table={
          <DataTable
            columns={columns}
            data={configs}
            loading={loading}
            rowKey="id"
            emptyText="Chưa có cấu hình nào. Hãy tạo một cấu hình mới!"
          />
        }
      />

      <CreateConfigModal 
        isOpen={createOpen} 
        onClose={() => setCreateOpen(false)} 
        onSuccess={fetchConfigs} 
      />
      
      <UpdateConfigModal 
        isOpen={updateOpen} 
        onClose={() => setUpdateOpen(false)} 
        onSuccess={fetchConfigs}
        initialData={getFormValues(selectedConfig)}
      />

      <DetailConfigModal 
        isOpen={detailOpen} 
        onClose={() => setDetailOpen(false)} 
        data={getFormValues(selectedConfig)}
      />
    </>
  );
}
