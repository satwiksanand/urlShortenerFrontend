import { useState } from 'react';
import { Copy, Check, Link as LinkIcon, ArrowRight, Loader2 } from 'lucide-react';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    try {
      setLoading(true);
      setError('');
      // TODO this is a mock api call, will replace it in the future
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple mock logic
      const mockId = Math.random().toString(36).substring(7);
      setShortUrl(`https://short.url/${mockId}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4 ring-1 ring-blue-500/20">
            <LinkIcon className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Shorten Your Links
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Transform long, ugly URLs into short, memorable links. 
            Ready to share in seconds.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-800/50 backdrop-blur-xl p-2 rounded-2xl ring-1 ring-white/10 shadow-2xl">
          <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="w-full pl-11 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Shortening...</span>
                </>
              ) : (
                <>
                  <span>Shorten</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        {/* Result Section, annoying little react */}
        {shortUrl && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-2xl ring-1 ring-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 min-w-0 text-center md:text-left">
                <p className="text-sm text-gray-400 mb-1">Your shortened link</p>
                <p className="text-xl font-medium text-blue-400 truncate">
                  {shortUrl}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  copied
                    ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
