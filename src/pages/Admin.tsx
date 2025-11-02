import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  Tag,
  Search,
  Filter,
  Eye,
  Check,
  X,
  RefreshCw,
  Download
} from "lucide-react";
import { useState } from "react";

// Review queue item interface
interface ReviewItem {
  id: number;
  title: string;
  platform: string;
  state: string;
  authority: string;
  date: string;
  reason: string;
  autoCategory: string;
  autoTags: string[];
  status: "pending" | "approved" | "rejected";
  contentType: "film" | "website" | "social_media" | "other";
  submittedAt: string;
}

// Sample review queue data
const reviewQueue: ReviewItem[] = [
  {
    id: 1,
    title: "Twitter account suspension in Karnataka",
    platform: "Twitter/X",
    state: "Karnataka",
    authority: "State Police",
    date: "2024-10-20",
    reason: "Hate speech allegations",
    autoCategory: "Hate Speech",
    autoTags: ["hate-speech", "karnataka", "twitter", "police"],
    status: "pending",
    contentType: "social_media",
    submittedAt: "2024-10-21T10:30:00Z"
  },
  {
    id: 2,
    title: "YouTube channel takedown",
    platform: "YouTube",
    state: "Maharashtra",
    authority: "Ministry of Electronics and IT",
    date: "2024-10-18",
    reason: "Misinformation about health",
    autoCategory: "Misinformation",
    autoTags: ["misinformation", "maharashtra", "youtube", "health"],
    status: "pending",
    contentType: "social_media",
    submittedAt: "2024-10-19T14:20:00Z"
  },
  {
    id: 3,
    title: "News website blocked",
    platform: "Website",
    state: "Delhi",
    authority: "Delhi High Court",
    date: "2024-10-15",
    reason: "Defamatory content",
    autoCategory: "Defamation",
    autoTags: ["defamation", "delhi", "court", "news"],
    status: "pending",
    contentType: "website",
    submittedAt: "2024-10-16T09:15:00Z"
  },
  {
    id: 4,
    title: "Film censorship case",
    platform: "Film",
    state: "Maharashtra",
    authority: "CBFC",
    date: "2024-10-12",
    reason: "Political content",
    autoCategory: "Political Content",
    autoTags: ["film", "cbfc", "political", "maharashtra"],
    status: "approved",
    contentType: "film",
    submittedAt: "2024-10-13T11:00:00Z"
  },
];

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("review");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [bulkData, setBulkData] = useState<string>("");

  const filteredQueue = reviewQueue.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.autoCategory.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = reviewQueue.filter(i => i.status === "pending").length;
  const approvedCount = reviewQueue.filter(i => i.status === "approved").length;
  const rejectedCount = reviewQueue.filter(i => i.status === "rejected").length;

  const handleApprove = (id: number) => {
    // In real app, this would update the database
    console.log(`Approved item ${id}`);
  };

  const handleReject = (id: number) => {
    // In real app, this would update the database
    console.log(`Rejected item ${id}`);
  };

  const handleBulkUpload = () => {
    // In real app, this would parse CSV/JSON and create review items
    console.log("Bulk upload:", uploadFile || bulkData);
    alert("Bulk upload processed! Items added to review queue.");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Auto-categorization function (simulated)
  const autoCategorize = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("hate") || lowerText.includes("speech")) return "Hate Speech";
    if (lowerText.includes("fake") || lowerText.includes("misinformation")) return "Misinformation";
    if (lowerText.includes("political") || lowerText.includes("election")) return "Political Content";
    if (lowerText.includes("defamation") || lowerText.includes("defamatory")) return "Defamation";
    if (lowerText.includes("security") || lowerText.includes("national")) return "National Security";
    return "Other";
  };

  const autoGenerateTags = (item: Partial<ReviewItem>) => {
    const tags: string[] = [];
    if (item.platform) tags.push(item.platform.toLowerCase().replace(/[^a-z0-9]/g, "-"));
    if (item.state) tags.push(item.state.toLowerCase());
    if (item.authority) tags.push(item.authority.toLowerCase().replace(/[^a-z0-9]/g, "-"));
    if (item.reason) {
      const category = autoCategorize(item.reason);
      tags.push(category.toLowerCase().replace(/[^a-z0-9]/g, "-"));
    }
    return tags;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Admin Data Entry
          </h1>
          <p className="text-muted-foreground">
            Bulk data upload, auto-categorization, and review queue management
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
            <TabsTrigger value="review">
              Review Queue
              {pendingCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          {/* Bulk Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Bulk Data Upload
                </CardTitle>
                <CardDescription>
                  Upload CSV or JSON files containing takedown datasets. Auto-categorization will be applied.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Upload File (CSV/JSON)
                    </label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept=".csv,.json"
                        onChange={handleFileChange}
                        className="flex-1"
                      />
                      <Button onClick={handleBulkUpload} disabled={!uploadFile}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload & Process
                      </Button>
                    </div>
                    {uploadFile && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {uploadFile.name}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or paste data directly
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Paste JSON/CSV Data
                    </label>
                    <Textarea
                      placeholder='[{"title": "...", "platform": "...", "state": "...", "authority": "...", "date": "...", "reason": "..."}]'
                      rows={10}
                      value={bulkData}
                      onChange={(e) => setBulkData(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-muted-foreground">
                        JSON array format or CSV with headers
                      </p>
                      <Button onClick={handleBulkUpload} disabled={!bulkData}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Process Data
                      </Button>
                    </div>
                  </div>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">Auto-Categorization Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span>Automatic tagging by platform, state, authority, and reason</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span>Category classification based on reason keywords</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span>Content type detection (film, website, social media)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Items added to review queue for accuracy verification</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Review Queue Tab */}
          <TabsContent value="review" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Review</p>
                      <p className="text-2xl font-bold">{pendingCount}</p>
                    </div>
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Approved</p>
                      <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Rejected</p>
                      <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Review Queue</CardTitle>
                    <CardDescription>
                      Verify and approve/reject auto-categorized entries before publishing
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search queue..."
                        className="pl-10 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Authority</TableHead>
                        <TableHead>Auto Category</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQueue.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.platform}</TableCell>
                          <TableCell>{item.state}</TableCell>
                          <TableCell>{item.authority}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.autoCategory}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {item.autoTags.slice(0, 3).map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {item.autoTags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{item.autoTags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                item.status === "approved" ? "default" :
                                item.status === "rejected" ? "destructive" :
                                "secondary"
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedItem(item)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Review Item</DialogTitle>
                                    <DialogDescription>
                                      Verify details and approve or reject
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedItem && (
                                    <div className="space-y-4 mt-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground">Title</p>
                                          <p className="text-base">{selectedItem.title}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground">Platform</p>
                                          <p className="text-base">{selectedItem.platform}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground">State</p>
                                          <p className="text-base">{selectedItem.state}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground">Authority</p>
                                          <p className="text-base">{selectedItem.authority}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground">Date</p>
                                          <p className="text-base">
                                            {new Date(selectedItem.date).toLocaleDateString()}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground">Content Type</p>
                                          <Badge>{selectedItem.contentType}</Badge>
                                        </div>
                                        <div className="col-span-2">
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Reason</p>
                                          <p className="text-base">{selectedItem.reason}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Auto Category</p>
                                          <Badge variant="outline">{selectedItem.autoCategory}</Badge>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground mb-1">Tags</p>
                                          <div className="flex flex-wrap gap-1">
                                            {selectedItem.autoTags.map((tag, idx) => (
                                              <Badge key={idx} variant="secondary" className="text-xs">
                                                {tag}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex justify-end gap-2 pt-4 border-t">
                                        <Button
                                          variant="destructive"
                                          onClick={() => {
                                            handleReject(selectedItem.id);
                                            setSelectedItem(null);
                                          }}
                                        >
                                          <X className="mr-2 h-4 w-4" />
                                          Reject
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            handleApprove(selectedItem.id);
                                            setSelectedItem(null);
                                          }}
                                        >
                                          <Check className="mr-2 h-4 w-4" />
                                          Approve
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              {item.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleApprove(item.id)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleReject(item.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filteredQueue.length === 0 && (
                    <div className="p-12 text-center">
                      <p className="text-muted-foreground">No items found in review queue.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manual Entry Tab */}
          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manual Data Entry</CardTitle>
                <CardDescription>
                  Enter individual takedown incidents manually
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input placeholder="Enter incident title" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Platform</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="film">Film</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">State</label>
                    <Input placeholder="Enter state" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Authority</label>
                    <Input placeholder="Enter authority" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Content Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="film">Film</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">Reason</label>
                    <Textarea 
                      placeholder="Enter reason for takedown/censorship"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Clear</Button>
                  <Button>Submit for Review</Button>
                </div>
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      <Tag className="inline h-3 w-3 mr-1" />
                      Auto-categorization and tags will be generated automatically upon submission
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;


