'use client'
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { transactions } from "../data";
import { useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import * as XLSX from 'xlsx'; // Import xlsx library

const TransactionTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1)
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Memoized filtered transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((transaction) =>
      transaction.orderId.toLowerCase().includes(search.toLowerCase())
    );
    switch (sortBy) {
      case "amount-asc":
        filtered = filtered.sort((a, b) => a.orderAmount - b.orderAmount);
        break;
      case "amount-desc":
        filtered = filtered.sort((a, b) => b.orderAmount - a.orderAmount);
        break;
      case "date-asc":
        filtered = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "date-desc":
        filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      default:
        break;
    }
    return filtered;
  }, [transactions, search, sortBy]);

  // Pagination settings
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handlers
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    setPage(1); // Reset to first page when sort changes
  };

  const handleDownload = () => {
    console.log("Downloading transaction data...");
    const worksheet = XLSX.utils.json_to_sheet(currentTransactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Transactions");

    // Generate Excel file blob object
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create download link element
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOrderIdClick = (orderId) => {
    router.push("/payments/" + orderId);
   
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber===0) {
        setPage(1);
    }
    else{
    setPage(pageNumber);}
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <Button onClick={handleDownload}>Download</Button>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search by Order ID"
            value={search}
            onChange={handleSearch}
            className="bg-white dark:bg-gray-950"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by <ChevronDownIcon className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => handleSort("amount-asc")}
                className={sortBy === "amount-asc"? "bg-muted" : ""}
              >
                Order Amount (Low to High)
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSort("amount-desc")}
                className={sortBy === "amount-desc"? "bg-muted" : ""}
              >
                Order Amount (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSort("date-desc")}
                className={sortBy === "date-desc"? "bg-muted" : ""}
              >
                Date (Latest to Oldest)
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSort("date-asc")}
                className={sortBy === "date-asc"? "bg-muted" : ""}
              >
                Date (Oldest to Latest)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTransactions.map((transaction) => (
              <TableRow key={transaction.id} onClick={() => handleOrderIdClick(transaction.orderId)}>
                <TableCell>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    {transaction.orderId}
                  </Link>
                </TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>${transaction.orderAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={transaction.status}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" onClick={() => handlePageChange(page)} active={page === currentPage}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

const ChevronDownIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

export default TransactionTable;
