import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    {/* Favicon */}
                    <link rel="icon" href="/images/Favicon-01.ico" />

                    {/* Meta tags */}
                    <meta name="description" content="LegislaAI - Inteligência Artificial para o Direito" />
                    <meta name="author" content="LegislaAI" />
                    <meta name="keywords" content="LegislaAI, Inteligência Artificial, Direito, Advogado, Jurídico" />
                    <meta name="robots" content="index, follow" />
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta httpEquiv="Content-Language" content="pt-br" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
