
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CreditCard, Banknote, Wallet, QrCode, Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DonationSection = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-masjid-dark mb-4">
            Support Your <span className="text-masjid-green">Local Masjid</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Your donations help maintain the masjid, support community programs, and ensure we can continue to serve our community.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="bank" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="bank">
                <Banknote className="h-4 w-4 mr-2 md:mr-1" />
                <span className="hidden md:inline">Bank Transfer</span>
              </TabsTrigger>
              <TabsTrigger value="card">
                <CreditCard className="h-4 w-4 mr-2 md:mr-1" />
                <span className="hidden md:inline">Card Details</span>
              </TabsTrigger>
              <TabsTrigger value="qr">
                <QrCode className="h-4 w-4 mr-2 md:mr-1" />
                <span className="hidden md:inline">QR Code</span>
              </TabsTrigger>
              <TabsTrigger value="upi">
                <Wallet className="h-4 w-4 mr-2 md:mr-1" />
                <span className="hidden md:inline">UPI/PayPal</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bank" className="p-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-masjid-dark">Bank Transfer Details</CardTitle>
                  <CardDescription>Send your donations directly to our bank account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Account Name</p>
                        <p className="font-medium">Al-Noor Masjid Foundation</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("Al-Noor Masjid Foundation", "Account Name")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Account Number</p>
                        <p className="font-medium">1234 5678 9012 3456</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("1234 5678 9012 3456", "Account Number")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Routing Number</p>
                        <p className="font-medium">987654321</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("987654321", "Routing Number")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Bank Name</p>
                        <p className="font-medium">Islamic Community Bank</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("Islamic Community Bank", "Bank Name")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="card" className="p-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-masjid-dark">Card Payment Details</CardTitle>
                  <CardDescription>Our official card details for donations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Card Holder</p>
                      <p className="font-medium">Al-Noor Masjid Treasury</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard("Al-Noor Masjid Treasury", "Card Holder")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-500 mb-2">Accepted Cards</p>
                    <div className="flex justify-center gap-4">
                      <img src="https://placehold.co/60x40/FAFAFA/7C7C7C?text=VISA" alt="Visa" className="h-8" />
                      <img src="https://placehold.co/60x40/FAFAFA/7C7C7C?text=MC" alt="Mastercard" className="h-8" />
                      <img src="https://placehold.co/60x40/FAFAFA/7C7C7C?text=AMEX" alt="American Express" className="h-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qr" className="p-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-masjid-dark">QR Code Payment</CardTitle>
                  <CardDescription>Scan to donate instantly</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg border mb-4">
                    <img src="https://placehold.co/200x200/FFFFFF/000000?text=QR+Code" alt="Donation QR Code" className="w-48 h-48" />
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    Scan this QR code with your banking or payment app to make a donation directly to the masjid.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upi" className="p-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-masjid-dark">UPI & PayPal Details</CardTitle>
                  <CardDescription>Quick digital payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">UPI ID</p>
                        <p className="font-medium">alnoor.masjid@upibank</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("alnoor.masjid@upibank", "UPI ID")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">PayPal</p>
                        <p className="font-medium">donations@alnoormasjid.org</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("donations@alnoormasjid.org", "PayPal")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
