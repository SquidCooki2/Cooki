from rest_framework import serializers
from .models import Provider, Job
from .models import Wallet, Invoice, PaymentMethod

class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    provider = ProviderSerializer(read_only=True)

    class Meta:
        model = Job
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ("month", "amount")

class PaymentMethodSerializer(serializers.ModelSerializer):
    # map to frontend names
    type = serializers.SerializerMethodField()
    lastFour = serializers.CharField(source="last_four")
    expiry = serializers.SerializerMethodField()
    isDefault = serializers.BooleanField(source="is_default")

    class Meta:
        model = PaymentMethod
        fields = ("id", "type", "lastFour", "expiry", "isDefault")

    def get_type(self, obj):
        # returns 'Visa' or 'Mastercard'
        return obj.get_type_display()

    def get_expiry(self, obj):
        # "MM/YY"
        yy = str(obj.expiry_year)[-2:]
        mm = f"{obj.expiry_month:02d}"
        return f"{mm}/{yy}"

class WalletSerializer(serializers.ModelSerializer):
    availableBalance = serializers.DecimalField(source="available_balance", max_digits=12, decimal_places=2)
    thisMonthSpending = serializers.DecimalField(source="this_month_spending", max_digits=12, decimal_places=2)
    invoices = InvoiceSerializer(many=True, source="provider.invoices", read_only=True)
    paymentMethods = PaymentMethodSerializer(many=True, source="provider.payment_methods", read_only=True)

    class Meta:
        model = Wallet
        fields = ("availableBalance", "thisMonthSpending", "invoices", "paymentMethods")