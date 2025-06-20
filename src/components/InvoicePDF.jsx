// ===============================
// InvoicePDF.jsx                  
// ===============================
import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        padding: 40,
        fontFamily: 'Helvetica',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 4,
        marginBottom: 4,
    },
    cellDesc: {
        width: '40%',
    },
    cellSmall: {
        width: '20%',
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    totals: {
        marginTop: 16,
        width: '40%',
        alignSelf: 'flex-end',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    brandingHeader: {
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    brandingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    brandingSubtitle: {
        fontSize: 10,
        marginTop: 4,
        color: '#555',
    },
    brandingInfo: {
        fontSize: 9,
        marginTop: 4,
    },
    brandingItalic: {
        fontSize: 9,
        fontStyle: 'italic',
        marginTop: 6,
    },
    licenseSection: {
        marginTop: 30,
    },
    licenseText: {
        fontSize: 9,
        lineHeight: 1.5,
    },
});

const InvoicePDF = ({
    invoiceDate,
    client,
    services,
    payment,
    subtotal,
    grandTotal,
}) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* ✅ Branding Header Section */}
            <View style={styles.brandingHeader}>
                <Text style={styles.brandingTitle}>Your Digital Front</Text>
                <Text style={styles.brandingSubtitle}>
                    A Professional Website That Welcomes & Converts Clients
                </Text>
                <Text style={styles.brandingItalic}>Presented by Tushar Gupta</Text>
                <Text style={styles.brandingInfo}>Software Developer</Text>
                <Text style={styles.brandingInfo}>+91-9455196697</Text>
                <Text style={styles.brandingInfo}>tushar-portfolio-webapp.netlify.app</Text>
            </View>

            {/* Invoice Title & Date */}
            <Text style={styles.title}>INVOICE</Text>
            <Text>Date: {invoiceDate}</Text>

            {/* Client */}
            <View style={[styles.section, { marginTop: 20 }]}>
                <Text style={styles.bold}>Bill To:</Text>
                <Text>{client.name}</Text>
                <Text>{client.company}</Text>
                <Text>{client.address}</Text>
                <Text>{client.email}</Text>
                <Text>{client.phone}</Text>
            </View>

            {/* Services Table */}
            <View style={styles.section}>
                <View style={styles.tableHeader}>
                    <Text style={styles.cellDesc}>Service</Text>
                    <Text style={styles.cellSmall}>Hours</Text>
                    <Text style={styles.cellSmall}>Rate</Text>
                    <Text style={styles.cellSmall}>Total</Text>
                </View>

                {/* User-entered services */}
                {services.map((s, i) => (
                    <View key={i} style={styles.row}>
                        <Text style={styles.cellDesc}>{s.description}</Text>
                        <Text style={styles.cellSmall}>{s.hours}</Text>
                        <Text style={styles.cellSmall}>{s.rate}</Text>
                        <Text style={styles.cellSmall}>{s.total}</Text>
                    </View>
                ))}

                {/* Preset additional services  */}
                {/* <View style={styles.row}>
                    <Text style={styles.cellDesc}>Contact form integrated with EmailJS</Text>
                    <Text style={styles.cellSmall}>0</Text>
                    <Text style={styles.cellSmall}>0</Text>
                    <Text style={styles.cellSmall}>0</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cellDesc}>Deployment assistance with hosting (3 months)</Text>
                    <Text style={styles.cellSmall}>0</Text>
                    <Text style={styles.cellSmall}>0</Text>
                    <Text style={styles.cellSmall}>0</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cellDesc}>1 month free support for bug fixes</Text>
                    <Text style={styles.cellSmall}>0</Text>
                    <Text style={styles.cellSmall}>0</Text>
                    <Text style={styles.cellSmall}>0</Text>
                </View> */}
            </View>


            {/* Totals */}
            <View style={styles.totals}>
                <View style={styles.totalRow}>
                    <Text>Subtotal:</Text>
                    <Text>{subtotal}</Text>
                </View>
                <View style={[styles.totalRow, styles.bold]}>
                    <Text>Grand Total:</Text>
                    <Text>{grandTotal}</Text>
                </View>
                <View style={[styles.totalRow, { marginTop: 8 }]}>
                    <Text>Payment Method:</Text>
                    <Text>{payment.method}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text>Transaction ID:</Text>
                    <Text>{payment.transactionId}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text>Payment Type:</Text>
                    <Text>{payment.type || '—'}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text>Remaining Payment:</Text>
                    <Text>{payment.remaining || '—'}</Text>
                </View>

            </View>

            {/* 📜 License Terms */}
            <View style={styles.licenseSection}>
                <Text style={[styles.bold, { marginBottom: 6 }]}>
                    License Terms (Standard – Non-Exclusive)
                </Text>
                <Text style={styles.licenseText}>
                    This website is built using a professionally crafted, modular design system that enables high-quality, fast, and cost-effective delivery.{"\n\n"}
                    When you purchase this service:{"\n"}
                    ● You receive a non-exclusive license to use a fully customized version of the website based on a template.{"\n"}
                    ● Your site will be visually unique — with your own branding, content, images, and colors — creating a personalized and trustworthy online presence.{"\n"}
                    ● The structural framework and codebase used to build your website are part of a reusable system developed to support multiple projects efficiently.{"\n"}
                    ● You may not resell, redistribute, or sublicense the website or its underlying code to others. This package does not include source code access, as the system is part of a licensed design framework.
                </Text>
            </View>

            {/* Horizontal line */}
            <View style={{ marginTop: 20, borderTopWidth: 1, borderColor: '#ccc' }} />

            {/* System-generated notice */}
            <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 9, color: '#666', textAlign: 'center' }}>
                    This is a system-generated invoice and does not require a physical signature.
                </Text>
            </View>


        </Page>
    </Document>
);

export default InvoicePDF;
